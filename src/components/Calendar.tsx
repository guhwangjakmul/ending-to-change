import { useState } from 'react'

import Calendar from 'react-calendar'
import moment from 'moment'

import '@/styles/calendar.css'
import Image from 'next/image'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function CalendarCC() {
  const today = new Date()
  const [date, setDate] = useState<Value>(today)

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  }

  // 이전 및 다음 달로 이동하는 함수
  const handlePreviousMonth = () => {
    const newDate = new Date(date as Date)
    newDate.setMonth(newDate.getMonth() - 1)
    setDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(date as Date)
    newDate.setMonth(newDate.getMonth() + 1)
    setDate(newDate)
  }

  // 특정 날짜를 정의 (예: 15일)
  const specialDate = new Date(today.getFullYear(), today.getMonth(), 15)

  return (
    <div className="mt-[32px] py-5 px-[45px]">
      {/* 커스터마이즈된 내비게이션 */}
      <div className="flex items-center justify-between mb-[20px] text-[15px]">
        <span>{date ? moment(date as Date).format('YYYY년 MM월') : '날짜를 선택하세요'}</span>
        <div className="flex gap-3">
          <button onClick={handlePreviousMonth}>
            <Image src="/image/prev-arrow.svg" alt="" width={20} height={20} />
          </button>
          <button onClick={handleNextMonth}>
            <Image src="/image/next-arrow.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </div>

      <Calendar
        value={date}
        formatDay={(locale, date) => moment(date).format('D')}
        calendarType="gregory"
        showNeighboringMonth={false}
        minDetail="year"
        tileClassName={({ date }) => {
          // 특정 날짜에 민트색 동그라미 추가
          return date.getTime() === specialDate.getTime() ? 'highlight-circle' : ''
        }}
      />
    </div>
  )
}
