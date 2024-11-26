import characterGroup from '@/assets/characterData'
import Button from '@/components/common/Button'
import ProgressBar from '@/components/common/ProgressBar'
import CharacterSection from '@/components/main/CharacterSection'
import Image from 'next/image'
import React from 'react'

const badge = () => {
  const selectedCharacter = 'soil'
  return (
    <div className="relative w-full h-full flex justify-center">
      <Image
        src={characterGroup[selectedCharacter].figure[2]}
        alt=""
        fill
        style={{ objectFit: 'cover' }}
      />

      <CharacterSection selectedCharacter={selectedCharacter} index={3} />
      <div className="absolute bottom-8 space-y-5">
        <ProgressBar currentProgress={200} level={3} />
        <div>
          <Button
            width={303}
            height={40}
            fontSize={16}
            color="text-medium-brown"
            backgroundColor="bg-yellow"
            isLink
            href="/mypage"
            children="돌아가기"
          />
        </div>
      </div>
    </div>
  )
}

export default badge
