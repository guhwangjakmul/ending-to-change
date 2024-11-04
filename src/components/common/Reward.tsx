import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import RewardText from './RewardText'
import { RewardProps } from '@/types/Reward'

export default function Reward(props: RewardProps) {
  const router = useRouter()
  const [isShowReward, setIsShowReward] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const { yaho, rewardContent, onClose } = props

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsFadingOut(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [onClose, router])

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setIsShowReward(false)
      router.push('/')
      onClose?.()
    }
  }

  if (!isShowReward) return null

  return (
    <div
      className={`relative w-screen h-screen ${
        isFadingOut ? 'animate-scale-out-center-slow' : 'animate-scale-in-center-slow'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Image src="/image/reward_background.svg" alt="" fill />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src="/image/reward.svg" alt="" width={110} height={110} className="mb-[25px]" />
        <RewardText yaho={yaho}>{rewardContent}</RewardText>
      </div>
    </div>
  )
}
