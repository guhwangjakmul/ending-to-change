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
  // const [distance, setDistance] = useState<number>(0)

  const [testCoordinates, setTestCoordinates] = useState([
    { latitude: 37.5665, longitude: 126.978 }, // 시작점
    { latitude: 37.56655, longitude: 126.97805 }, // 북동쪽 약 50m
    { latitude: 37.5666, longitude: 126.9781 }, // 북동쪽 약 50m
    { latitude: 37.56665, longitude: 126.97815 }, // 북동쪽 약 50m
    { latitude: 37.5667, longitude: 126.9782 }, // 북동쪽 약 50m
    { latitude: 37.56672, longitude: 126.9783 }, // 약간 동쪽 약 50m
    { latitude: 37.56674, longitude: 126.9784 }, // 약간 북동쪽 약 50m
    { latitude: 37.56676, longitude: 126.9785 }, // 약간 북쪽 약 50m
    { latitude: 37.56678, longitude: 126.9786 }, // 약간 북쪽 약 50m
    { latitude: 37.5668, longitude: 126.9787 }, // 북쪽 약 50m
    { latitude: 37.56685, longitude: 126.97875 }, // 북쪽 약 50m
    { latitude: 37.5669, longitude: 126.9788 }, // 약간 북동쪽 약 50m
    { latitude: 37.56695, longitude: 126.97885 }, // 약간 동쪽 약 50m
    { latitude: 37.567, longitude: 126.9789 }, // 북동쪽 약 50m
    { latitude: 37.56705, longitude: 126.979 }, // 북동쪽 약 50m
  ]) // 테스트용 좌표 상태로 관리

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

  // 테스트용 좌표를 업데이트하는 함수
  const addTestCoordinates = useCallback(() => {
    if (walkType === 'walking') {
      setTestCoordinates(prev => {
        if (prev.length > 0) {
          const [nextCoordinate, ...remainingCoordinates] = prev
          const moveLatLon = new kakao.maps.LatLng(
            nextCoordinate.latitude,
            nextCoordinate.longitude,
          )
          const newPosition = positionArr.concat(moveLatLon)
          setPositionArr(newPosition)

          // 폴리라인 그리는 함수 호출
          makeLine(newPosition)

          // 지도 중심 업데이트
          setCenter({ latitude: nextCoordinate.latitude, longitude: nextCoordinate.longitude })

          return remainingCoordinates // 다음 상태를 갱신
        }
        return prev
      })
    }
  }, [positionArr, makeLine, walkType])

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

  // 지도 객체 변경 시 테스트용 폴리라인 생성
  useEffect(() => {
    if (map && walkType === 'walking') {
      const interval = setInterval(() => {
        addTestCoordinates() // 테스트용 좌표 추가
      }, 2000) // 2초마다 업데이트

      return () => {
        clearInterval(interval)
      }
    }
  }, [map, addTestCoordinates, walkType])

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
                width: 50, // 마커 이미지의 너비
                height: 50, // 마커 이미지의 높이
              },
              options: {
                offset: {
                  x: 25, // 이미지 중심의 x축 위치
                  y: 50, // 이미지 중심의 y축 위치
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
