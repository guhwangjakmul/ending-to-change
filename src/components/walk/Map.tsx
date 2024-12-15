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
  // const [center, setCenter] = useState<Coordinates | null>(null) // 지도 중심 좌표

  const [center, setCenter] = useState({ lat: 37.631582, lng: 127.054814 }) // 지도 중심 좌표

  const [testCoordinates, setTestCoordinates] = useState([
    { latitude: 37.631582, longitude: 127.054814 }, // 인덕대 인관
    { latitude: 37.6317, longitude: 127.0549 }, // 경로 중간 1
    { latitude: 37.6318, longitude: 127.055 }, // 경로 중간 2
    { latitude: 37.6319, longitude: 127.0551 }, // 경로 중간 3
    { latitude: 37.632, longitude: 127.0552 }, // 경로 중간 4
    { latitude: 37.6321, longitude: 127.0553 }, // 경로 중간 5
    { latitude: 37.632222, longitude: 127.055022 }, // 인덕대 도서관
  ])

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

  // 테스트 좌표를 주기적으로 추가
  useEffect(() => {
    if (walkType === 'walking') {
      const interval = setInterval(() => {
        setTestCoordinates(prev => {
          if (prev.length > 0) {
            const [nextCoordinate, ...remainingCoordinates] = prev
            const moveLatLon = new kakao.maps.LatLng(
              nextCoordinate.latitude,
              nextCoordinate.longitude,
            )
            const newPosition = [...positionArr, moveLatLon]
            setPositionArr(newPosition)
            makeLine(newPosition)
            setCenter({ lat: nextCoordinate.latitude, lng: nextCoordinate.longitude })
            return remainingCoordinates
          }
          return prev
        })
      }, 2000) // 2초마다 테스트 좌표 업데이트

      return () => clearInterval(interval)
    }
  }, [walkType, positionArr, makeLine])

  // // Geolocation API로 현재 위치 가져오기
  // useEffect(() => {
  //   if (!location) {
  //     navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
  //       enableHighAccuracy: true,
  //     })
  //   }
  // }, [location])

  // // 위치 정보가 변경될 때마다 Polyline 업데이트
  // useEffect(() => {
  //   if (walkType === 'walking' && location) {
  //     setPositionArr(prev => {
  //       const newPosition = [...prev, new kakao.maps.LatLng(location.latitude, location.longitude)]
  //       makeLine(newPosition)

  //       // 경로 업데이트 로그 출력
  //       console.log(
  //         'Updated Positions:',
  //         newPosition.map(pos => ({
  //           latitude: pos.getLat(),
  //           longitude: pos.getLng(),
  //         })),
  //       )

  //       return newPosition
  //     })
  //   }
  // }, [walkType, location, makeLine])

  // 주기적으로 위치 업데이트 (5초마다)
  // useEffect(() => {
  //   if (walkType === 'walking') {
  //     const interval = setInterval(() => {
  //       navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
  //         enableHighAccuracy: true,
  //       })
  //     }, 5000) // 5초마다 위치 갱신

  //     return () => clearInterval(interval) // cleanup
  //   }
  // }, [walkType])

  // // 현재 위치 업데이트 성공 핸들러
  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords
    const currentLocation = { latitude, longitude }

    setLocation(currentLocation)
    // setCenter(currentLocation) // 지도 중심을 현재 위치로 설정
    setIsLoading(false)

    console.log('Location fetch success:', currentLocation)
  }

  // 현재 위치 업데이트 실패 핸들러
  const errorHandler = (error: GeolocationPositionError) => {
    console.error('Error fetching location:', error)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
  }, [])

  return (
    <>
      {location ? (
        <Map
          // center={{
          //   lat: center.latitude,
          //   lng: center.longitude,
          // }}
          center={center}
          style={{ width: '100%', height: '100vh' }}
          level={2}
          onCreate={setMap} // Kakao Map 객체 생성 시 호출
          draggable={false} // 지도 드래그 막기
          zoomable={false} // 확대/축소 막기
        >
          {/* 현재 위치에 마커 표시 */}
          <MapMarker
            position={{ lat: center.lat, lng: center.lng }}
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
