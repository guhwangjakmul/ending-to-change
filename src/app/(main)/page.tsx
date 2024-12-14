'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import characterGroup from '@/assets/characterData'
import CharacterSection from '@/components/main/CharacterSection'
import FooterButtons from '@/components/main/FooterButtons'
import Levelup from '@/components/main/Levelup'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'
import {
  getPotion,
  getProgress,
  updateIsAllCompleted,
  upgradeProgress,
  usePotion,
} from '@/apis/main'
import { getUserId } from '@/apis/user'
import { changeComplete, getCategoryProgress } from '@/apis/category'
import dynamic from 'next/dynamic'
import { setLocalStorageCategory } from '@/utils/common/localStorage'
import useUserStore from '@/store/useUserStore'

// 로딩 컴포넌트를 동적으로 불러오기
const Loading = dynamic(() => import('@/app/loading'), { ssr: false })

export default function Page() {
  // const [userId, setUserId] = useState<string>('')
  // const [categoryId, setCategoryId] = useState<number>(1)
  const [loading, setLoading] = useState(true) // 로딩 상태 추가

  // 물약 & 경험치
  const [potion, setPotion] = useState<number | null>(null)
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [level, setLevel] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [isAllCompleted, setIsAllCompleted] = useState(false)

  const {
    userId: zustandUserId,
    categoryId: zustandCategoryId,
    setUserId,
    setCategoryId,
  } = useUserStore()

  const getSelectedCharacter = (
    categoryId: number,
  ): 'water' | 'air' | 'soil' | 'warming' | 'recycle' | 'energy' => {
    switch (categoryId) {
      case 1:
        return 'water'
      case 2:
        return 'air'
      case 3:
        return 'soil'
      case 4:
        return 'warming'
      case 5:
        return 'recycle'
      case 6:
        return 'energy'
      default:
        throw new Error('Invalid categoryId')
    }
  }

  // `categoryId`가 로드된 후 선택된 캐릭터 설정
  const selectedCharacter = zustandCategoryId ? getSelectedCharacter(zustandCategoryId) : null

  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [isShowLevelup, setIsShowLevelup] = useState(false)

  useEffect(() => {
    if (isAllCompleted) {
      console.log('All categories completed!')
    }
    // setLocalStorageCategory('category', 'id', categoryId)
    setLocalStorageCategory('category', 'id', zustandCategoryId || 0)
  }, [isAllCompleted, zustandCategoryId])

  useEffect(() => {
    if (isAllCompleted) {
      console.log('All categories completed!')
    }
  }, [isAllCompleted])

  // 페이지가 로드될 때 유저의 potion 값 불러오기
  useEffect(() => {
    const fetchPotionAndProgress = async () => {
      try {
        let userId: string | null = zustandUserId
        if (!userId) {
          // Zustand에 userId가 없는 경우 API 호출로 로드
          userId = (await getUserId()) || null
          if (!userId) throw new Error('User ID not found')
          setUserId(userId)
        }

        let categoryId: number | null = zustandCategoryId
        if (!categoryId) {
          // Zustand에 categoryId가 없는 경우 API 호출로 로드
          const getCategory = await getCategoryProgress(userId)
          const incompleteCategory = getCategory.find(category => !category.is_completed)
          if (!incompleteCategory) {
            setIsAllCompleted(true)
            return
          }

          categoryId = incompleteCategory.category_id
          setCategoryId(categoryId)
        }

        // 포션 및 진행 상태 로드
        const initialPoint = await getPotion(userId)
        const initialProgress = await getProgress(userId, categoryId)

        if (initialPoint !== null) setPotion(initialPoint)
        if (initialProgress !== null) {
          setCurrentProgress(initialProgress)

          // currentProgress에 따라 초기 level 설정
          if (initialProgress < 100) {
            setLevel(1)
            setIndex(0)
          } else if (initialProgress >= 100 && initialProgress < 250) {
            setLevel(2)
            setIndex(1)
            setCurrentProgress(initialProgress - 100)
          } else if (initialProgress >= 250 && initialProgress < 450) {
            setLevel(3)
            setIndex(2)
            setCurrentProgress(initialProgress - 250)
          } else if (initialProgress === 450) {
            setIndex(2)
            setIsEnd(true)
            setLevel(3)
            setCurrentProgress(initialProgress - 250)
          }
        }
      } finally {
        setLoading(false) // 데이터 로딩 완료 후 로딩 상태를 false로 설정
      }
    }

    fetchPotionAndProgress()
  }, [zustandUserId, zustandCategoryId, setUserId, setCategoryId])

  const handleCloseLevelup = () => {
    setIsShowLevelup(false)
    if (level < 3) {
      setLevel(level + 1)
      setIndex(index + 1)
    } else {
      setIsEnd(true)
    }
  }

  const handleUsePotion = async () => {
    if (potion !== null && potion > 0) {
      setPotion(prev => (prev !== null ? prev - 1 : 0))
      setMessage('물약을 사용해서 10hp를 회복했어요!')

      usePotion(zustandUserId!) // API 호출

      // 경험치 업데이트
      if (currentProgress !== null) {
        const newProgress = currentProgress + 10
        await upgradeProgress(zustandUserId!, zustandCategoryId!) // API 호출
        setCurrentProgress(newProgress)

        // 레벨 업 로직
        if (level === 1 && newProgress >= 100) {
          setIsShowLevelup(true)
          setCurrentProgress(newProgress - 100)
        } else if (level === 2 && newProgress >= 150) {
          setIsShowLevelup(true)
          setCurrentProgress(newProgress - 150)
        } else if (level === 3 && newProgress >= 200) {
          setIsShowLevelup(true)
          setCurrentProgress(newProgress - 200)
          await changeComplete(zustandUserId!, zustandCategoryId!)

          // 모든 카테고리 완료 확인
          const getCategory = await getCategoryProgress(zustandUserId!)
          const allCompleted = getCategory.every(category => category.is_completed)

          if (allCompleted && getCategory.length === 6) {
            await updateIsAllCompleted(zustandUserId!)
            setIsAllCompleted(true)
          }
        }
      }
      setTimeout(() => setMessage(''), 500)
    } else {
      setMessage('물약이 부족해요')
      setTimeout(() => setMessage(''), 500)
    }
  }

  if (loading) {
    return <Loading /> // 로딩 중에 로딩 컴포넌트를 표시
  }

  return (
    <div className="relative w-full h-full flex justify-center">
      {selectedCharacter && (
        <Image
          src={characterGroup[selectedCharacter].figure[index]}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
        />
      )}
      {selectedCharacter && (
        <CharacterSection selectedCharacter={selectedCharacter} index={index} />
      )}
      {message && (
        <div
          className={`font-gothic-m absolute top-2/3 text-xl animate-fadeout ${
            zustandCategoryId === 4 ? 'text-dark-brown' : 'text-light-beige'
          }`}
        >
          {message}
        </div>
      )}

      {!isEnd && (
        <FooterButtons
          currentProgress={currentProgress ?? 0}
          level={level}
          handleUsePotion={handleUsePotion}
          count={potion ?? 0}
        />
      )}

      {isEnd && (
        <div className="absolute bottom-8 space-y-5">
          <ProgressBar currentProgress={currentProgress ?? 0} level={level} />
          <div>
            <Button
              width={303}
              height={40}
              fontSize={16}
              color="text-medium-brown"
              backgroundColor="bg-yellow"
              isLink
              href="/category"
              children="다른 주민 구하기"
            />
          </div>
        </div>
      )}

      {isShowLevelup && selectedCharacter && (
        <Levelup
          selectedCharacter={selectedCharacter}
          index={index}
          onClose={handleCloseLevelup}
          level={level}
          isAllCompleted={isAllCompleted}
        />
      )}

      {isAllCompleted && (
        <div className="absolute bg-cream w-full h-full justify-center items-center flex flex-col space-y-6">
          <p className="font-gothic-b text-brown">주민을 모두 구했습니다!</p>
          <Button
            width={104}
            height={40}
            fontSize={16}
            backgroundColor="bg-mint"
            color="text-light-mint"
            isLink
            href="/mypage"
            children="마이홈으로"
            isMediumFont
          />
        </div>
      )}
    </div>
  )
}
