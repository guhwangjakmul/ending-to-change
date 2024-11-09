import { ProgressBarProps, LabelType, ProgressColor, BackgroundColor } from '@/types/ProgressBar'

export default function ProgressBar(props: ProgressBarProps) {
  const { labelType = 'Lv', currentProgress, level, showLabel = true, maxKm } = props

  // 최대값을 계산하는 함수 호출
  const max = getMaxValue(labelType, level, maxKm)
  // 진행 퍼센티지를 계산
  const progressPercentage = (currentProgress / max) * 100

  return (
    <div className="flex flex-col w-full space-y-2">
      {showLabel && renderLabel(labelType, currentProgress, max, level)}
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
) => {
  const fontSize = labelType === 'Lv' ? 'text-[12px]' : 'text-[14px]'
  const fontStyle = labelType === 'Lv' ? 'font-sindinaru-b' : 'font-gothic-b'

  return (
    <div className={`text-brown flex items-center justify-between ${fontSize} ${fontStyle}`}>
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
