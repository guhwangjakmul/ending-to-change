import Image from 'next/image'
import { RewardTextProps } from '@/types/TextField'

export default function RewardText(props: RewardTextProps) {
  const { yaho = '야호~!', children, handleRewardTextClick } = props

  return (
    <div
      onClick={handleRewardTextClick}
      className={`animate-scale-in-center flex flex-col items-center cursor-pointer
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
