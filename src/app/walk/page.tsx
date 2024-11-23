'use client'

import Header from '@/components/common/header/Header'
import WalkMap from '@/components/walk/Map'
import { useState } from 'react'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import useModal from '../hook/useModal'
import Image from 'next/image'
import Reward from '@/components/common/Reward'

export type WalkType = 'initial' | 'walking' | 'stop'

export default function Page() {
  const [isOpen, openModal, closeModal, portalElement] = useModal()

  const [isLoading, setIsLoading] = useState(true)
  const [walkType, setWalkType] = useState<WalkType>('initial')
  const [isShowReward, setIsShowReward] = useState(false)

  const getReward = () => {
    setIsShowReward(false)
    closeModal()
  }

  return (
    <div className="relative">
      {isLoading || (walkType === 'initial' && <Header useReportBtn />) || (
        <Header backOnClick={openModal} />
      )}
      <WalkMap setIsLoading={setIsLoading} walkType={walkType} setWalkType={setWalkType} />
      {/* 걷기 도중 헤더 < 버튼 눌렀을 때 */}
      {portalElement && isOpen && walkType === 'walking' && (
        <Modal height={238} onClick={openModal}>
          <div className="w-full h-full flex flex-col justify-between items-center py-[30px] text-center font-gothic-b  text-brown">
            <div className="flex justify-center items-center">
              <Image src={'/image/system/warning.svg'} alt="" width="40" height="40" />
              <span className="text-[24px]">경고</span>
              <Image src={'/image/system/warning.svg'} alt="" width="40" height="40" />
            </div>
            <span className="text-[16px]">
              걷기를 종료하시겠습니까?
              <br />
              보상을 받지 못할 수 있습니다
            </span>
            <div className="flex gap-[30px]">
              <Button
                width={100}
                height={40}
                fontSize={12}
                onClick={() => setIsShowReward(true)}
                backgroundColor="bg-orange"
              >
                걷기 종료
              </Button>
              <Button
                width={100}
                height={40}
                fontSize={12}
                onClick={closeModal}
                backgroundColor="bg-white"
                color="text-brown"
              >
                돌아가기
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {/* 걷기 멈추고 헤더 < 버튼 눌렀을 때 */}
      {portalElement && isOpen && walkType === 'stop' && (
        <Modal height={219} onClick={openModal}>
          <div className="w-full h-full flex flex-col justify-between items-center py-[30px] text-center font-gothic-b  text-brown">
            <div className="flex justify-center items-center">
              <Image src={'/image/system/warning.svg'} alt="" width="40" height="40" />
              <span className="text-[24px]">걷기 종료</span>
              <Image src={'/image/system/warning.svg'} alt="" width="40" height="40" />
            </div>
            <span className="text-[16px]">보상받기를 눌러주세요</span>
            <Button width={100} height={40} fontSize={12} onClick={() => setIsShowReward(true)}>
              보상받기
            </Button>
          </div>
        </Modal>
      )}
      {isShowReward && (
        <Reward rewardContent="탄소를 줄여서 치료약 10개를 획득했다!" onClose={getReward} />
      )}
    </div>
  )
}
