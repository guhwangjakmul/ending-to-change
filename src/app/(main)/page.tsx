'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import characterGroup from '@/assets/characterData'
import CharacterSection from '@/components/main/CharacterSection'
import FooterButtons from '@/components/main/FooterButtons'
import Levelup from '@/components/main/Levelup'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'

export default function page() {
  //임의 물약 & 경험치
  const [potion, setPotion] = useState(90)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [level, setLevel] = useState(1)

  //캐릭터 인덱스
  const [index, setIndex] = useState(0)
  const selectedCharacter = 'air'

  const [message, setMessage] = useState('')
  const [isShowLevelup, setIsShowLevelup] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

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
    setPotion(potion - 1)
    setTimeout(() => setMessage(''), 500)

    const newProgress = currentProgress + 10
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
          currentProgress={currentProgress}
          level={level}
          handleUsePotion={() => {
            if (potion > 0) {
              handleUsePotion()
            } else {
              setMessage('물약이 부족해요')
              setTimeout(() => setMessage(''), 500)
            }
          }}
          count={potion}
        />
      )}

      {/* 풀 레벨업 화면 */}
      {isEnd && (
        <div className="absolute bottom-8 space-y-5">
          <ProgressBar currentProgress={currentProgress} level={level} />
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
