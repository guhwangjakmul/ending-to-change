import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import RewardText from './RewardText'

import { RewardProps } from '@/types/Reward'

export default function Reward(props: RewardProps) {
  const router = useRouter()
  const [showReward, setShowReward] = useState(true)

  const { yaho, rewardContent, onClose } = props

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setShowReward(true)
      onClose()
      router.push('/')
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!showReward) return null

  return (
    <div className="relative w-screen h-screen">
      <Image src="/image/reward_background.svg" alt="" fill />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src="/image/reward.svg" alt="" width={110} height={110} className="mb-[25px]" />
        <RewardText yaho={yaho}>{rewardContent}</RewardText>
      </div>
    </div>
  )
}
