'use client'

import Loading from '@/app/loading'
import { useEffect, useState, useCallback } from 'react'
import { Map } from 'react-kakao-maps-sdk'
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

  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }) // 지도 중심 좌표

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
          setCenter({ lat: nextCoordinate.latitude, lng: nextCoordinate.longitude })

          return remainingCoordinates // 다음 상태를 갱신
        }
        return prev
      })
    }
  }, [positionArr, makeLine, walkType])

  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords
    setLocation({ latitude, longitude })
    setIsLoading(false)
    console.log('Location fetch success')
  }

  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error fetching location:', error)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
  }, [])

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
      {location ? (
        <Map
          center={center} // 지도 중심을 동적으로 설정
          style={{ width: '100%', height: '100vh' }}
          level={2}
          onCreate={setMap} // Kakao Map 객체 생성 시 호출
        ></Map>
      ) : (
        <Loading />
      )}
    </>
  )
}
