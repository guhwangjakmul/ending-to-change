import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Text } from '@/types/TextField'

export default function RewardText(props: Text & { onScaleOutStart?: () => void }) {
  const [isRewardTextScaleOut, setIsRewardTextScaleOut] = useState(false)

  const { yaho = '야호~!', children, onScaleOutStart } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRewardTextScaleOut(true) // 스케일 아웃 애니메이션 시작
      onScaleOutStart?.() // 부모 컴포넌트에 애니메이션 시작 알림
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex flex-col items-center  ${
        isRewardTextScaleOut ? 'animate-scale-out-center' : 'animate-scale-in-center'
      }
      `}
    >
      <div className="w-[330px] h-[100px] bg-beige flex items-center justify-center rounded-[40px]">
        <p className="cursor-default text-[16px] font-sindinaru-b text-brown text-center leading-5 tracking-[-0.24px]">
          {yaho}
          <br />
          {children}
        </p>
      </div>
      <Image
        src="/image/yellow_triangle.svg"
        alt=""
        width={15}
        height={7}
        className="mt-[-5px] animate-slide-top"
      />
    </div>
  )
}
