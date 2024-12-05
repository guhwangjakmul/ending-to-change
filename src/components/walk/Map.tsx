'use client'

import Loading from '@/app/loading'
import { useEffect, useState, useCallback } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Coordinates, WalkType } from '@/app/walk/page'

interface WalkMapProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  location: Coordinates | null
  setLocation: React.Dispatch<React.SetStateAction<Coordinates | null>>
  walkType: WalkType
  setDistance: React.Dispatch<React.SetStateAction<number>>
}

export default function WalkMap(props: WalkMapProps) {
  const { setIsLoading, location, setLocation, walkType, setDistance } = props

  const [map, setMap] = useState<any>(null) // Kakao Map 객체
  const [positionArr, setPositionArr] = useState<any[]>([]) // 폴리라인 그릴 좌표 배열

  const [center, setCenter] = useState<Coordinates | null>(null) // 지도 중심 좌표

  // 폴리라인 그리는 함수
  const makeLine = useCallback(
    (position: any[]) => {
      if (walkType === 'walking') {
        const polyline = new kakao.maps.Polyline({
          path: position,
          strokeWeight: 3,
          strokeColor: '#3478F5',
          strokeOpacity: 1,
          strokeStyle: 'solid',
        })

        // 지도에 폴리라인 표시
        polyline.setMap(map)

        // 새로운 거리 계산
        const newDistance = polyline.getLength()

        // 비동기로 상태 업데이트
        setTimeout(() => {
          setDistance(newDistance)
        }, 0)
      }
    },
    [map, walkType],
  )

  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords
    const currentLocation = { latitude, longitude }

    setLocation(currentLocation)
    setCenter(currentLocation) // 지도 중심을 현재 위치로 설정
    setIsLoading(false)
    console.log('Location fetch success')
  }

  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error fetching location:', error)
  }

  // 현재 위치를 한 번만 가져옴
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
        enableHighAccuracy: true,
      })
    }
  }, [location])

  useEffect(() => {
    if (walkType === 'walking' && location) {
      setPositionArr(prev => {
        const newPotion = [...prev, new kakao.maps.LatLng(location.latitude, location.longitude)]
        makeLine(newPotion)
        return newPotion
      })
    }
  }, [walkType, location, makeLine])

  return (
    <>
      {center ? (
        <Map
          center={{
            lat: center.latitude,
            lng: center.longitude,
          }}
          style={{ width: '100%', height: '100vh' }}
          level={2}
          onCreate={setMap} // Kakao Map 객체 생성 시 호출
          draggable={walkType !== 'walking'} // walkType이 walking일 때 지도 드래그 막기
          zoomable={walkType !== 'walking'} // walkType이 walking일 때 확대/축소 막기
        >
          {/* 현재 위치에 마커 표시 */}
          <MapMarker
            position={{ lat: center.latitude, lng: center.longitude }}
            image={{
              src: '/image/map_pin.svg', // SVG 파일 경로
              size: {
                width: 50,
                height: 50,
              },
              options: {
                offset: {
                  x: 25,
                  y: 50,
                },
              },
            }}
          />
        </Map>
      ) : (
        <Loading />
      )}
    </>
  )
}
