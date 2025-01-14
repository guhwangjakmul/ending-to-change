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
  const [positionArr, setPositionArr] = useState<any[]>([]) // Polyline 좌표 배열
  const [center, setCenter] = useState<Coordinates | null>(null) // 지도 중심 좌표

  // 폴리라인 그리는 함수
  const makeLine = useCallback(
    (position: any[]) => {
      if (walkType === 'walking') {
        const polyline = new kakao.maps.Polyline({
          path: position, // Polyline 경로
          strokeWeight: 3, // 선의 두께
          strokeColor: '#3478F5', // 선의 색깔
          strokeOpacity: 1, // 선의 투명도
          strokeStyle: 'solid', // 선의 스타일
        })

        // 지도에 Polyline 추가
        polyline.setMap(map)

        // 거리 계산 후 업데이트
        const newDistance = polyline.getLength()
        setTimeout(() => {
          setDistance(newDistance)
        }, 0)
      }
    },
    [map, walkType, setDistance],
  )

  // 현재 위치 업데이트 성공 핸들러
  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords
    const currentLocation = { latitude, longitude }

    setLocation(currentLocation)
    setCenter(currentLocation) // 지도 중심을 현재 위치로 설정
    setIsLoading(false)

    console.log('Location fetch success:', currentLocation)
  }

  // 현재 위치 업데이트 실패 핸들러
  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error fetching location:', error)
  }

  // Geolocation API로 현재 위치 가져오기
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
        enableHighAccuracy: true,
      })
    }
  }, [location])

  // 위치 정보가 변경될 때마다 Polyline 업데이트
  useEffect(() => {
    if (walkType === 'walking' && location) {
      setPositionArr(prev => {
        const newPosition = [...prev, new kakao.maps.LatLng(location.latitude, location.longitude)]
        makeLine(newPosition)

        // 경로 업데이트 로그 출력
        console.log(
          'Updated Positions:',
          newPosition.map(pos => ({
            latitude: pos.getLat(),
            longitude: pos.getLng(),
          })),
        )

        return newPosition
      })
    }
  }, [walkType, location, makeLine])

  // 주기적으로 위치 업데이트 (5초마다)
  useEffect(() => {
    if (walkType === 'walking') {
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
          enableHighAccuracy: true,
        })
      }, 5000) // 5초마다 위치 갱신

      return () => clearInterval(interval) // cleanup
    }
  }, [walkType])

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
          draggable={false} // 지도 드래그 막기
          zoomable={false} // 확대/축소 막기
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
