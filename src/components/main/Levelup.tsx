import React, { useState } from 'react'
import Image from 'next/image'
import RewardText from '../common/RewardText'
import Button from '../common/Button'
import characterGroup from '@/assets/characterData'

interface CharacterData {
  background: string[]
  levelupText: string[]
}

interface LevelupProps {
  onClose: () => void
  selectedCharacter: keyof typeof characterGroup
  index: number
  level: number
  isAllCompleted: boolean
}

export default function Levelup(props: LevelupProps) {
  const { onClose, selectedCharacter, index, level, isAllCompleted } = props
  const character = characterGroup[selectedCharacter] as CharacterData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-[390px] h-full">
        <Image src={character.background[index]} alt="" fill className="object-cover" />
        <div className="cursor-default absolute inset-0 flex flex-col items-center justify-center">
          <RewardText
            handleRewardTextClick={() => {
              if (!isAllCompleted) onClose()
            }}
          >
            {character.levelupText[index]}
          </RewardText>
        </div>
      </div>
      {level === 3 && !isAllCompleted && (
        <section className="absolute bottom-10 flex gap-3">
          <Button
            width={104}
            height={40}
            fontSize={16}
            backgroundColor="bg-beige"
            color="text-brown"
            onClick={onClose}
            isMediumFont
          >
            돌아가기
          </Button>
          <Button
            width={145}
            height={40}
            fontSize={16}
            backgroundColor="bg-mint"
            color="text-light-mint"
            isLink
            href="/category"
            isMediumFont
          >
            다른 주민 구하기
          </Button>
        </section>
      )}

      {level === 3 && isAllCompleted && (
        <section className="absolute bottom-10 flex gap-3">
          <Button
            width={104}
            height={40}
            fontSize={16}
            backgroundColor="bg-beige"
            color="text-brown"
            isLink
            href="/mypage"
            isMediumFont
          >
            마이홈으로
          </Button>
          <Button
            width={145}
            height={40}
            fontSize={16}
            backgroundColor="bg-gray"
            color="text-light-gray"
            onClick={() => {
              alert('모든 주민을 구했습니다!')
            }}
            isMediumFont
          >
            다른 주민 구하기
          </Button>
        </section>
      )}
    </div>
  )
}
