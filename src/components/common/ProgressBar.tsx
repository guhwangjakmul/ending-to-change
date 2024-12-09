'use client'

import { ProgressBarProps, LabelType, ProgressColor, BackgroundColor } from '@/types/ProgressBar'
import { useEffect, useState } from 'react'

export default function ProgressBar(props: ProgressBarProps) {
  const { labelType = 'Lv', currentProgress, level, showLabel = true, maxKm } = props

  // 최대값을 계산하는 함수 호출
  const max = getMaxValue(labelType, level, maxKm)
  // 진행 퍼센티지를 계산
  const progressPercentage = (currentProgress / max) * 100

  const [category, setCategory] = useState<{ id: number; name: string } | null>(null)

  useEffect(() => {
    const storedCategory = localStorage.getItem('category')
    if (storedCategory) {
      try {
        setCategory(JSON.parse(storedCategory)) // JSON 데이터를 객체로 변환
      } catch (error) {
        console.error('카테고리 데이터를 파싱하는 중 오류 발생:', error)
      }
    }
  }, [])

  return (
    <div className="flex flex-col w-full space-y-2">
      {showLabel && renderLabel(labelType, currentProgress, max, level, category?.name)}
      <div className="relative w-full h-3 flex items-center space-x-2">
        <div className={`w-full h-3 ${getBackgroundColor(labelType)} rounded-full overflow-hidden`}>
          <div
            className={`h-full rounded-full ${getProgressColor(labelType, currentProgress, max)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// 최대값을 계산하는 함수: 'Lv' 타입일 경우 레벨에 따라, 'Km' 타입일 경우 목표 거리 사용
const getMaxValue = (labelType?: LabelType, level?: number, maxKm?: number): number => {
  if (labelType === 'Lv') {
    return getLevelMaxValue(level)
  }
  return maxKm || 3 // Km 타입의 기본값
}

// 레벨별 최대값을 반환하는 함수
const getLevelMaxValue = (level?: number): number => {
  switch (level) {
    case 1:
      return 100
    case 2:
      return 150
    case 3:
      return 200
    default:
      return 0
  }
}

// ProgressBar 라벨을 렌더링하는 함수
const renderLabel = (
  labelType?: 'Lv' | 'Km',
  currentProgress?: number,
  max?: number,
  level?: number,
  categoryName?: string,
) => {
  const fontSize = labelType === 'Lv' ? 'text-[12px]' : 'text-[14px]'
  const fontStyle = labelType === 'Lv' ? 'font-sindinaru-b' : 'font-gothic-b'

  // 카테고리에 따라 텍스트 색상을 변경
  const textColor =
    categoryName === '수질오염' || categoryName === '에너지 절약' || categoryName === '토양오염'
      ? 'text-cream'
      : 'text-brown'

  return (
    <div className={`flex items-center justify-between ${fontSize} ${fontStyle} ${textColor}`}>
      {/* 'Lv' 타입일 경우 레벨 정보 표시 */}
      {labelType === 'Lv' ? <span>Lv.{level}</span> : <span>오늘 걸은 거리</span>}
      <span>
        {/* 현재 진행도와 최대값을 표시 */}
        {labelType === 'Km' ? `${currentProgress} / ${max}` : `${currentProgress}/${max}`}{' '}
        {labelType === 'Km' ? 'km' : ''}
      </span>
    </div>
  )
}

// 배경색을 반환하는 함수
const getBackgroundColor = (labelType?: LabelType): BackgroundColor => {
  return labelType === 'Km' ? 'bg-white' : 'bg-[#d9d9d9]'
}

// 진행 색상을 반환하는 함수
const getProgressColor = (
  labelType?: LabelType,
  currentProgress?: number,
  max?: number,
): ProgressColor => {
  if (labelType === 'Lv') {
    return currentProgress === max ? 'bg-mint-green' : 'bg-lime-green'
  }
  return 'bg-yellow'
}
