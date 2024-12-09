'use client'

import characterGroup from '@/assets/characterData'
import Button from '@/components/common/Button'
import ProgressBar from '@/components/common/ProgressBar'
import CharacterSection from '@/components/main/CharacterSection'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function badge() {
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<
    'water' | 'air' | 'soil' | 'warming' | 'recycle' | 'energy'
  >('water')

  useEffect(() => {
    const getStoredCategoryId = (): number | null => {
      const storedData = localStorage.getItem('viewResultCategory')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        return parseInt(parsedData.id)
      } else {
        console.log('데이터가 localStorage에 없습니다.')
        return null
      }
    }

    const id = getStoredCategoryId()
    if (id !== null) {
      setCategoryId(id)
      setSelectedCharacter(getSelectedCharacter(id))
    }
  }, [])

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

  if (!categoryId) {
    return <div>로딩 중...</div>
  }

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
