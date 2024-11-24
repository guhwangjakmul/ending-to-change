'use client'

import Loading from '@/app/loading'
import { useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { Coordinates, WalkType } from '@/app/walk/page'

interface WalkMapProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  location: Coordinates | null
  setLocation: React.Dispatch<React.SetStateAction<Coordinates | null>>
}

export default function WalkMap(props: WalkMapProps) {
  const { setIsLoading, location, setLocation } = props

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

  return (
    <>
      {location ? (
        <>
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '100%', height: '100vh' }}
            level={5}
          ></Map>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
