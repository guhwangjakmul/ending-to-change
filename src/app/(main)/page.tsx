'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import characterGroup from '@/assets/characterData'
import CharacterSection from '@/components/main/CharacterSection'
import FooterButtons from '@/components/main/FooterButtons'
import Levelup from '@/components/main/Levelup'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'
import { getPotion, getProgress, upgradeProgress, usePotion } from '@/apis/main'
import { getUserId } from '@/apis/user'
import { changeComplete, getCategoryProgress } from '@/apis/category'
import dynamic from 'next/dynamic'

// 로딩 컴포넌트를 동적으로 불러오기
const Loading = dynamic(() => import('@/app/loading'), { ssr: false })

export default function Page() {
  const [userId, setUserId] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number>(1)
  const [loading, setLoading] = useState(true) // 로딩 상태 추가

  // 임의 물약 & 경험치
  const [potion, setPotion] = useState<number | null>(null)
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [level, setLevel] = useState(1)
  const [isEnd, setIsEnd] = useState(false)

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
  const selectedCharacter = getSelectedCharacter(categoryId)

  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [isShowLevelup, setIsShowLevelup] = useState(false)

  // 페이지가 로드될 때 유저의 potion 값 불러오기
  useEffect(() => {
    const fetchPotionAndProgress = async () => {
      try {
        const userId = await getUserId()
        if (!userId) throw new Error('User ID not found')
        setUserId(userId)

        const getCategory = await getCategoryProgress(userId)
        const incompleteCategory = getCategory.find(category => !category.is_completed)

        // 만약 불완전한 카테고리를 찾지 못했다면 에러 처리
        if (!incompleteCategory) throw new Error('No incomplete category found')

        // 조건에 맞는 카테고리 ID로 설정
        const categoryId = incompleteCategory.category_id
        setCategoryId(categoryId)

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
  }, [])

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
    setMessage('물약을 사용해서 10hp를 회복했어요!')
    if (potion !== null && potion > 0) {
      const newPotion = potion - 1
      setPotion(newPotion)
    }

    setTimeout(() => setMessage(''), 500)
    usePotion(userId)

    if (currentProgress !== null) {
      const newProgress = currentProgress + 10
      upgradeProgress(userId, categoryId!)
      setCurrentProgress(newProgress)

      if (level === 1 && newProgress === 100) {
        setIsShowLevelup(true)
        setCurrentProgress(0)
      } else if (level === 2 && newProgress === 150) {
        setIsShowLevelup(true)
        setCurrentProgress(0)
      } else if (level === 3 && newProgress === 200) {
        setIsShowLevelup(true)
        changeComplete(userId, categoryId!)
      }
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
      <CharacterSection selectedCharacter={selectedCharacter} index={index} />

      {message && (
        <div className="font-gothic-m absolute text-light-beige top-2/3 text-lg animate-fadeout">
          {message}
        </div>
      )}

      {!isEnd && (
        <FooterButtons
          currentProgress={currentProgress ?? 0}
          level={level}
          handleUsePotion={() => {
            if (potion !== null && potion > 0) {
              handleUsePotion()
            } else {
              setMessage('물약이 부족해요')
              setTimeout(() => setMessage(''), 500)
            }
          }}
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

      {isShowLevelup && (
        <Levelup
          selectedCharacter={selectedCharacter}
          index={index}
          onClose={handleCloseLevelup}
          level={level}
        />
      )}
    </div>
  )
}
