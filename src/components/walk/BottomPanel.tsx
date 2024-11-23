import { WalkType } from '@/app/walk/page'
import Image from 'next/image'
import React from 'react'

interface BottomPanelProps {
  walkType: WalkType
  setWalkType: React.Dispatch<React.SetStateAction<WalkType>>
  setIsShowReward: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BottomPanel(props: BottomPanelProps) {
  const { walkType, setWalkType, setIsShowReward } = props
  return (
    <>
      {/* 걷기 초기 상태 */}
      {walkType === 'initial' && (
        <div className="absolute bottom-[50px] z-10 w-[360px] h-[90px] bg-walk-bottom left-[50%] translate-x-[-50%] flex items-center px-[20px] rounded-[30px]">
          <button
            className="rounded-full bg-mint-green w-[60px] h-[60px] flex justify-center items-center shadow-walk-button"
            onClick={() => setWalkType('walking')}
          >
            <Image src={'/image/button/walk_start.svg'} alt="" width="18" height="24" />
          </button>
          <span className="font-gothic-b text-[15px] text-beige ml-[10px]">
            걷기를 측정하려면 버튼을 눌러주세요
          </span>
        </div>
      )}
      {/* 걷기 중일 때 */}
      {walkType === 'walking' && (
        <div className="absolute bottom-[50px] z-10 w-[360px] h-[90px] bg-walk-bottom left-[50%] translate-x-[-50%] flex items-center px-[20px] rounded-[30px]">
          <button
            className="rounded-full w-[60px] h-[60px] border-2 border-beige flex justify-center items-center"
            onClick={() => setWalkType('stop')}
          >
            <Image src={'/image/button/walk_stop.svg'} alt="" width="18" height="18" />
          </button>
          <span className="font-gothic-b text-[15px] text-beige ml-[62px]">
            현재 2.3km 걷는 중&hellip;
          </span>
        </div>
      )}
      {/* 걷기 멈췄을 때 */}
      {walkType === 'stop' && (
        <div className="absolute bottom-[50px] z-10 w-[360px] h-[90px] bg-walk-bottom left-[50%] translate-x-[-50%] flex items-center px-[20px] rounded-[30px]">
          <button
            className="rounded-full w-[60px] h-[60px] bg-light-yellow flex justify-center items-center"
            onClick={() => setIsShowReward(true)}
          >
            <Image src={'/image/button/reward.svg'} alt="" width="40" height="40" />
          </button>
          <span className="font-gothic-b text-[15px] text-beige ml-[62px]">총 2.3km 걸었어요!</span>
        </div>
      )}
    </>
  )
}
