interface ProgressBarProps {
  labelType?: 'Lv' | 'Km'
  value: number
  level?: number
  showLabel?: boolean
  km?: number
}

export default function ProgressBar({
  labelType,
  value,
  level,
  showLabel = true,
  km,
}: ProgressBarProps) {
  const max = getMaxValue(labelType, level, km)
  const progressPercentage = (value / max) * 100

  return (
    <div className="flex flex-col w-full space-y-2">
      {showLabel && renderLabel(labelType, value, max, level)}
      <div className="relative w-full h-4 flex items-center space-x-2">
        <div className={`w-full h-4 ${getBackgroundColor(labelType)} rounded-full overflow-hidden`}>
          <div
            className={`h-full rounded-full ${getProgressColor(labelType, value, max)}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {shouldShowIcon(labelType, showLabel) && (
          <div
            className="absolute h-[30px] w-[30px] bg-yellow rounded-full flex items-center justify-center"
            style={{ left: `calc(${progressPercentage}% - 15px)` }}
          >
            <img src="/image/shoes.svg" alt="Icon" className="w-[20px]" />
          </div>
        )}
      </div>
    </div>
  )
}

function getMaxValue(labelType?: 'Lv' | 'Km', level?: number, km?: number) {
  if (labelType === 'Lv') {
    return level === 1 ? 100 : level === 2 ? 150 : level === 3 ? 200 : 0
  }
  return km || 3
}

function renderLabel(labelType?: 'Lv' | 'Km', value?: number, max?: number, level?: number) {
  const fontSize = labelType === 'Lv' ? 'text-[12px]' : 'text-[14px]'
  const fontStyle = labelType === 'Lv' ? 'font-sindinaru-b' : 'font-gothic-b'
  return (
    <div className={`text-brown flex items-center justify-between ${fontSize} ${fontStyle}`}>
      {labelType === 'Lv' ? <span>Lv.{level}</span> : <span>오늘 걸은 거리</span>}
      <span>
        {value}/{max} {labelType === 'Km' ? 'km' : ''}
      </span>
    </div>
  )
}

function getBackgroundColor(labelType?: 'Lv' | 'Km') {
  return labelType === 'Km' ? 'bg-white' : 'bg-[#d9d9d9]'
}

function getProgressColor(labelType?: 'Lv' | 'Km', value?: number, max?: number) {
  if (labelType === 'Lv') {
    return value === max ? 'bg-mint-green' : 'bg-lime-green'
  }
  return 'bg-yellow'
}

function shouldShowIcon(labelType?: 'Lv' | 'Km', showLabel?: boolean) {
  return labelType === 'Km' && !showLabel
}
