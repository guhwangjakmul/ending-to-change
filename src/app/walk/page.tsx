'use client'

import Header from '@/components/common/header/Header'
import WalkMap from '@/components/walk/Map'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import useModal from '../hook/useModal'
import Image from 'next/image'
import Reward from '@/components/common/Reward'
import BottomPanel from '@/components/walk/BottomPanel'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/useUserStore'
import { updateWalkDistance } from '@/apis/date'
import { calculatePoints } from '@/utils/common/calculatePoints'
import { updateUserPoint } from '@/apis/quiz'

export type WalkType = 'initial' | 'walking' | 'stop'

export interface Coordinates {
  latitude: number
  longitude: number
}

export default function Page() {
  const router = useRouter()
  // 초기에는 업데이트되지 않은 상태
  const hasUpdated = useRef(false)

  const [isOpen, openModal, closeModal, portalElement] = useModal()

  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [walkType, setWalkType] = useState<WalkType>('initial')
  const [isShowReward, setIsShowReward] = useState(false)
  const [distance, setDistance] = useState<number>(0)
  const [rewardPoints, setRewardPoints] = useState(0)

  const { userId } = useUserStore()

  const handleReward = async (distance: number) => {
    try {
      if (!userId) throw new Error('User ID가 없습니다.')

      const points = calculatePoints(distance)
      setRewardPoints(points)
      setIsShowReward(true)

      await updateUserPoint(userId, points)
    } catch (error) {
      console.log('보상 지급 중 오류:', error)
    }
  }

  useEffect(() => {
    if (walkType === 'stop' && !hasUpdated.current) {
      hasUpdated.current = true // 업데이트 상태로 변경
      if (!userId) throw new Error('User ID가 없습니다.')

      updateWalkDistance(userId, distance)
    }
  }, [walkType, userId, distance])

  const formatDistance = (distanceInMeters: number): string => {
    if (distanceInMeters >= 1000) {
      // 1000m 이상인 경우, km로 변환하여 소수점 첫째 자리까지 표시
      const distanceInKm = (distanceInMeters / 1000).toFixed(1)
      return `${distanceInKm} km`
    } else {
      // 1000m 미만인 경우, 소수점 버리고 m로 표시
      const flooredMeters = Math.floor(distanceInMeters)
      return `${flooredMeters} m`
    }
  }

  const getReward = () => {
    setIsShowReward(false)
    closeModal()
  }

  return (
    <div className="relative">
      {isLoading || (walkType === 'initial' && <Header useReportBtn />) || (
        <Header backOnClick={openModal} />
      )}
      <WalkMap
        setIsLoading={setIsLoading}
        location={location}
        setLocation={setLocation}
        walkType={walkType}
        setDistance={setDistance}
      />
      {isLoading || (
        <BottomPanel
          walkType={walkType}
          setWalkType={setWalkType}
          handleReward={() => handleReward(distance)}
          distance={formatDistance(distance)}
        />
      )}
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
                onClick={() => router.push('/')}
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
            <Button width={100} height={40} fontSize={12} onClick={() => handleReward(distance)}>
              보상받기
            </Button>
          </div>
        </Modal>
      )}
      {isShowReward && (
        <Reward
          rewardContent={
            <>
              탄소를 줄여서 <span className="text-mint-green">치료약 {rewardPoints}개</span>를
              획득했다!
            </>
          }
          onClose={getReward}
        />
      )}
    </div>
  )
}
