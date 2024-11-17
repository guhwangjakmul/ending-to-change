import { useState } from 'react'

import Calendar from 'react-calendar'
import moment from 'moment'

import '@/styles/calendar.css'
import CustomNavigation from './CustomNavigation'
import { DateRecord } from '@/types/Date'

interface CustomCalendarProps {
  selectedDate: DateRecord | null
  onDateChange: (date: Date) => void
}

export default function CustomCalendar(props: CustomCalendarProps) {
  const today = new Date()
  // 현재 월을 관리하는 상태 추가
  const [currentMonth, setCurrentMonth] = useState<Date>(today)
  const { selectedDate, onDateChange } = props

  // 이전 및 다음 달로 이동하는 함수
  const handlePreviousMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // 특정 날짜를 정의 (예: 15일)
  const specialDate = new Date(today.getFullYear(), today.getMonth(), 15)

  return (
    <div className="mt-[32px] py-5 px-[45px]">
      <CustomNavigation
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <Calendar
        locale="ko"
        value={selectedDate ? new Date(selectedDate.date) : today}
        activeStartDate={currentMonth}
        onClickDay={(date: Date) => {
          onDateChange(date)
        }}
        formatDay={(locale, date) => moment(date).format('D')}
        showNeighboringMonth={false}
        minDetail="year"
        tileClassName={({ date }) => {
          const isToday = moment(date).isSame(today, 'day')
          const isSelected = moment(date).isSame(selectedDate?.date, 'day')
          const isSpecialDate = date.getTime() === specialDate.getTime()

          if (isToday && isSelected) {
            return 'today-selected' // 오늘 날짜가 선택된 경우 주황색 배경 유지
          }
          if (isToday && !isSelected) {
            return 'today' // 오늘 날짜가 선택되지 않은 경우 주황색 폰트
          }
          if (isSelected && !isToday) {
            return isSpecialDate ? 'clicked-date highlight-circle' : 'clicked-date' // 선택된 날짜가 오늘이 아닌 경우 브라운 박스
          }
          if (isSpecialDate) {
            return 'highlight-circle' // 특정 날짜(걸은 날이 있을 때)에 민트색 동그라미 추가
          }
          return ''
        }}
      />
    </div>
  )
}
