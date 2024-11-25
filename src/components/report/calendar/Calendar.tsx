import { useState } from 'react'

import Calendar from 'react-calendar'
import moment from 'moment'

import '@/styles/calendar.css'
import CustomNavigation from './CustomNavigation'

import { DateInfo } from '@/types/Date'

interface CustomCalendarProps {
  dateInfo: DateInfo[]
  selectedDate: DateInfo | null
  onDateChange: (date: Date) => void
}

export default function CustomCalendar(props: CustomCalendarProps) {
  const today = new Date()
  // 현재 월을 관리하는 상태 추가
  const [currentMonth, setCurrentMonth] = useState<Date>(today)
  const { dateInfo, selectedDate, onDateChange } = props

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

  const isWalkDate = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    return dateInfo.some(record => {
      const recordDate = moment(record.created_at).format('YYYY-MM-DD')
      return recordDate === formattedDate && record.distance > 0
    })
  }

  return (
    <div className="mt-[72px] py-5 px-[45px]">
      <CustomNavigation
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <Calendar
        locale="ko"
        value={selectedDate ? new Date(selectedDate.created_at) : today}
        activeStartDate={currentMonth}
        onClickDay={(date: Date) => {
          onDateChange(date)
        }}
        formatDay={(locale, date) => moment(date).format('D')}
        showNeighboringMonth={false}
        minDetail="year"
        tileClassName={({ date }) => {
          const isToday = moment(date).isSame(today, 'day') // 오늘 날짜인지 확인
          const isSelected = moment(date).isSame(selectedDate?.created_at, 'day') // 선택된 날짜인지 확인
          const hasWalked = isWalkDate(date) // 걸은 날인지 확인

          if (isToday && isSelected) {
            return hasWalked ? 'today-selected highlight-circle' : 'today-selected' // 오늘 날짜가 선택되고 걸은 날인지 확인
          }
          if (isToday && !isSelected) {
            return hasWalked ? 'today highlight-circle' : 'today' // 오늘 날짜가 걸은 날인지 확인
          }
          if (isSelected && !isToday) {
            return hasWalked ? 'clicked-date highlight-circle' : 'clicked-date' // 선택된 날짜가 오늘이 아닌 경우
          }
          if (hasWalked) {
            return 'highlight-circle' // 걸은 날
          }
          return ''
        }}
      />
    </div>
  )
}
