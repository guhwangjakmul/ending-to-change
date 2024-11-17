import React, { useEffect, useRef, useState } from 'react'

import '@/styles/rangeSlider.css'

interface RangeSliderProps {
  currentProgress: number
  onChange: (e: number) => void
  isOpen: boolean
}

export default function RangeSlider(props: RangeSliderProps) {
  const { currentProgress, onChange, isOpen } = props

  const sliderRef = useRef<HTMLInputElement | null>(null)
  const [sliderValue, setSliderValue] = useState(currentProgress)

  useEffect(() => {
    if (isOpen) {
      setSliderValue(currentProgress)
      if (sliderRef.current) {
        sliderRef.current.style.setProperty('--slider-value', `${(currentProgress / 10) * 100}%`)
      }
    }
  }, [isOpen, currentProgress])

  const handleSliderChange = (e: any) => {
    const newValue = e.target.value
    setSliderValue(newValue)
    onChange && onChange(newValue)

    e.target.style.setProperty('--slider-value', `${(newValue / e.target.max) * 100}%`)
  }

  return (
    <input
      type="range"
      min="0"
      max={10}
      value={sliderValue}
      onChange={handleSliderChange}
      ref={sliderRef}
      className="custom-range-slider"
    />
  )
}
