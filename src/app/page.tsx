'use client'
import { useState } from 'react'
import Reward from '@/components/common/Reward'

export default function Test() {
  const [isShowReward, setIsShowReward] = useState(false)

  const handleShowReward = () => {
    setIsShowReward(true)
  }

  const handleCloseReward = () => {
    setIsShowReward(false)
  }

  return (
    <>
      {!isShowReward && (
        <button
          onClick={handleShowReward}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          보상 받기
        </button>
      )}
      {isShowReward && (
        <Reward
          onClose={handleCloseReward}
          yaho="앗, 아쉬워~"
          rewardContent={
            <span>
              퀴즈는 틀렸지만 <span className="text-mint-green">치료약 1개</span>를 획득했다!
            </span>
          }
        />
      )}
    </>
  )
}
