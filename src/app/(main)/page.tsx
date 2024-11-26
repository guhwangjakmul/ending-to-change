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

export default function page() {
  const userId = '47dd1195-11d0-4227-b42e-e7e6ad96045b'
  const categoryId = 1
  //임의 물약 & 경험치 (데이터로 처리해야하는 것들)
  const [potion, setPotion] = useState<number | null>(null)
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [level, setLevel] = useState(1)
  const [isEnd, setIsEnd] = useState(false)

  //카테고리
  const getSelectedCharacter = (categoryId: number) => {
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
    }
  }
  const selectedCharacter = getSelectedCharacter(categoryId)

  //캐릭터 인덱스
  const [index, setIndex] = useState(0)

  const [message, setMessage] = useState('')
  const [isShowLevelup, setIsShowLevelup] = useState(false)

  // 페이지가 로드될 때 유저의 potion 값 불러오기
  useEffect(() => {
    const fetchPotionAndProgress = async () => {
      const initialPoint = await getPotion(userId)
      const initialProgress = await getProgress(userId, categoryId)

      if (initialPoint !== null) {
        setPotion(initialPoint)
      }

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
        }
      }
    }

    fetchPotionAndProgress()
  }, [userId, categoryId])

  const handleCloseLevelup = () => {
    setIsShowLevelup(false)
    if (level < 3) {
      setLevel(level + 1)
      setIndex(index + 1)
    } else {
      setIsEnd(true)
    }
  }

  const handleUsePotion = () => {
    setMessage('물약을 사용해서 10hp를 회복했어요!')
    if (potion !== null && potion > 0) {
      const newPotion = potion - 1
      setPotion(newPotion)
    }

    setTimeout(() => setMessage(''), 500)
    usePotion(userId)

    if (currentProgress !== null) {
      const newProgress = currentProgress + 10
      upgradeProgress(userId, categoryId, newProgress)
      setCurrentProgress(newProgress)

      if (level === 1 && newProgress === 100) {
        setIsShowLevelup(true)
        setCurrentProgress(0)
      } else if (level === 2 && newProgress === 150) {
        setIsShowLevelup(true)
        setCurrentProgress(0)
      } else if (level === 3 && newProgress === 200) {
        setIsShowLevelup(true)
      }
    }
  }

  return (
    <div className="relative w-full h-full flex justify-center">
      <Image
        src={characterGroup[selectedCharacter].figure[index]}
        alt=""
        fill
        style={{ objectFit: 'cover' }}
      />
      {/* 주민 대사 */}
      <CharacterSection selectedCharacter={selectedCharacter} index={index} />
      {/* 회복 메세지 */}
      {message && (
        <div className="font-gothic-m absolute text-light-beige top-2/3 text-lg animate-fadeout">
          {message}
        </div>
      )}

      {/* 기본 화면 */}
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

      {/* 풀 레벨업 화면 */}
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

      {/* 레벨업 화면 */}
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
