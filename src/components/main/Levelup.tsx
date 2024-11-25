import React from 'react'
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
}

function Levelup(props: LevelupProps) {
  const { onClose, selectedCharacter, index, level } = props
  const character = characterGroup[selectedCharacter] as CharacterData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-[390px] h-full">
        <Image src={character.background[index]} alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <RewardText>{character.levelupText[index]}</RewardText>
        </div>
      </div>
      {level === 3 && (
        <section className="absolute bottom-10 flex gap-3">
          <Button
            width={104}
            height={40}
            fontSize={16}
            backgroundColor="bg-beige"
            color="text-brown"
            onClick={() => {}}
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
    </div>
  )
}

export default Levelup
