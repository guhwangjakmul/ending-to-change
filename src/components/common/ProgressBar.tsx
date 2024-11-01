interface ProgressBarProps {
  labelType?: 'Lv' | 'Km'
  currentProgress: number
  level?: number
  showLabel?: boolean
  maxKm?: number
}

export default function ProgressBar({
  labelType = 'Lv',
  currentProgress,
  level,
  showLabel = true,
  maxKm,
}: ProgressBarProps) {
  // 최대값을 계산하는 함수 호출
  const max = getMaxValue(labelType, level, maxKm)
  // 진행 퍼센티지를 계산
  const progressPercentage = (currentProgress / max) * 100

  return (
    <div className="flex flex-col w-full space-y-2">
      {showLabel && renderLabel(labelType, currentProgress, max, level)}
      <div className="relative w-full h-4 flex items-center space-x-2">
        <div className={`w-full h-4 ${getBackgroundColor(labelType)} rounded-full overflow-hidden`}>
          <div
            className={`h-full rounded-full ${getProgressColor(labelType, currentProgress, max)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {shouldShowIcon(labelType, showLabel) && (
          <div
            className="absolute h-[30px] w-[30px] bg-yellow rounded-full flex items-center justify-center"
            style={{ left: `calc(${progressPercentage}% - 30px)` }}
          >
            <img src="/image/shoes.svg" alt="Icon" className="w-[20px]" />
          </div>
        )}
      </div>
    </div>
  )
}

// 최대값을 계산하는 함수: 'Lv' 타입일 경우 레벨에 따라, 'Km' 타입일 경우 목표 거리 사용
function getMaxValue(labelType?: 'Lv' | 'Km', level?: number, maxKm?: number) {
  if (labelType === 'Lv') {
    return getLevelMaxValue(level)
  }
  return maxKm || 3 // Km 타입의 기본값
}

// 레벨별 최대값을 반환하는 함수
function getLevelMaxValue(level?: number) {
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
function renderLabel(
  labelType?: 'Lv' | 'Km',
  currentProgress?: number,
  max?: number,
  level?: number,
) {
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
function getBackgroundColor(labelType?: 'Lv' | 'Km') {
  return labelType === 'Km' ? 'bg-white' : 'bg-[#d9d9d9]'
}

// 진행 색상을 반환하는 함수
function getProgressColor(labelType?: 'Lv' | 'Km', currentProgress?: number, max?: number) {
  if (labelType === 'Lv') {
    return currentProgress === max ? 'bg-mint-green' : 'bg-lime-green'
  }
  return 'bg-yellow'
}

// 아이콘을 표시할지 여부를 반환하는 함수
function shouldShowIcon(labelType?: 'Lv' | 'Km', showLabel?: boolean) {
  return labelType === 'Km' && !showLabel
}
