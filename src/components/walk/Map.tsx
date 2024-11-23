'use client'

import Loading from '@/app/loading'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import Reward from '../common/Reward'
import { WalkType } from '@/app/walk/page'

interface Location {
  latitude: number
  longitude: number
}

interface WalkMapProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  walkType: WalkType
  setWalkType: React.Dispatch<React.SetStateAction<WalkType>>
}

export default function WalkMap(props: WalkMapProps) {
  const { setIsLoading, walkType, setWalkType } = props

  const [location, setLocation] = useState<Location | null>(null)
  const [isShowReward, setIsShowReward] = useState(false)

  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords
    setLocation({ latitude, longitude })
    setIsLoading(false)
    console.log('Location fetch success')
  }

  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error fetching location:', error)
  }

  const handleCloseReward = () => {
    setIsShowReward(false)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
  }, [])

  return (
    <>
      {location ? (
        <>
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '100%', height: '100vh' }}
            level={5}
          ></Map>
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
              <span className="font-gothic-b text-[15px] text-beige ml-[62px]">
                총 2.3km 걸었어요!
              </span>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
      {isShowReward && (
        <Reward rewardContent="탄소를 줄여서 치료약 10개를 획득했다!" onClose={handleCloseReward} />
      )}
    </>
  )
}
