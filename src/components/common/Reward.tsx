import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import RewardText from './RewardText'
import { RewardProps } from '@/types/Reward'

export default function Reward(props: RewardProps) {
  const router = useRouter()
  const [isRewardScaleOut, setIsRewardScaleOut] = useState(false) // Reward가 사라지는 상태

  const { yaho, rewardContent, onClose } = props

  // RewardText가 사라지기 시작하면 일정 시간 후 Reward도 사라지도록
  const handleRewardTextScaleOutStart = () => {
    setTimeout(() => {
      setIsRewardScaleOut(true)
    }, 100)
  }

  const handleAnimationEnd = () => {
    if (isRewardScaleOut) {
      router.push('/')
      onClose?.()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isRewardScaleOut ? 'animate-scale-out-center-slow' : 'animate-scale-in-center-slow'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="relative w-full max-w-[390px] h-full">
        <Image src="/image/reward_background.svg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image src="/image/reward.svg" alt="" width={110} height={110} className="mb-[25px]" />
          <RewardText yaho={yaho} onScaleOutStart={handleRewardTextScaleOutStart}>
            {rewardContent}
          </RewardText>
        </div>
      </div>
    </div>
  )
}
