interface ProgressBarProps {
  labelType?: 'Lv' | 'Km'
  value: number
  level?: number
  showLabel?: boolean
}

export default function ProgressBar({
  labelType,
  value,
  level,
  showLabel = true,
}: ProgressBarProps) {
  const max =
    labelType === 'Lv' ? (level === 1 ? 100 : level === 2 ? 150 : level === 3 ? 200 : 0) : 5

  const progressPercentage = (value / max) * 100

  const fontSize = labelType === 'Lv' ? 'text-[12px]' : 'text-[14px]'
  const fontStyle = labelType === 'Lv' ? 'font-sindinaru-b' : 'font-gothic-b'

  const backgroundColor = labelType === 'Km' ? 'bg-white' : 'bg-[#d9d9d9]'
  const progressColor =
    labelType === 'Lv' ? (max === value ? 'bg-mint-green' : 'bg-lime-green') : 'bg-yellow'

  return (
    <div className="flex flex-col w-full space-y-2">
      {showLabel && (
        <div className={`text-brown flex items-center justify-between ${fontSize} ${fontStyle}`}>
          {labelType === 'Lv' ? <span>Lv.{level}</span> : <span>오늘 걸은 거리</span>}
          <span className="">
            {value}/{max} {labelType === 'Km' ? 'km' : ''}
          </span>
        </div>
      )}

      <div className="relative w-full h-4 flex items-center space-x-2">
        <div className={`w-full h-4 ${backgroundColor} rounded-full overflow-hidden`}>
          <div
            className={`h-full rounded-full ${progressColor}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {labelType === 'Km' && !showLabel && (
          <div
            className=" absolute h-[30px] w-[30px] bg-yellow rounded-full flex items-center justify-center"
            style={{ left: `calc(${progressPercentage}% - 15px)` }}
          >
            <img src="/image/shoes.svg" alt="Icon" className="w-[20px]" />
          </div>
        )}
      </div>
    </div>
  )
}
