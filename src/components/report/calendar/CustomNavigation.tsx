import Image from 'next/image'
import moment from 'moment'

interface CalendarNavigationProps {
  currentMonth: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export default function CustomNavigation(props: CalendarNavigationProps) {
  const { currentMonth, onPreviousMonth, onNextMonth } = props
  return (
    <div className="flex items-center justify-between mb-[20px] text-[15px]">
      <span>{moment(currentMonth).format('YYYY년 MM월')}</span>
      <div className="flex gap-3">
        <button onClick={onPreviousMonth}>
          <Image src="/image/prev-arrow.svg" alt="" width={20} height={20} />
        </button>
        <button onClick={onNextMonth}>
          <Image src="/image/next-arrow.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  )
}
