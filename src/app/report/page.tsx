'use client'
import { useState } from 'react'
import Image from 'next/image'
import moment from 'moment'

import Header from '@/components/common/header/Header'
import Calendar from '@/components/report/Calendar'
import TodayEcoStats from '@/components/report/TodayEcoStats'
import WeeklyEcoChart from '@/components/report/WeeklyEcoChart'

export default function page() {
  // 선택한 날짜와 일주일을 상태로 관리
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [weekRange, setWeekRange] = useState<{ start: string; end: string } | null>(null)

  // 일주일 계산 함수
  const getWeekRange = (date: Date) => {
    const startOfWeek = moment(date).startOf('week') // 일요일 시작
    const endOfWeek = moment(date).endOf('week') // 토요일 끝
    return {
      start: startOfWeek.format('YYYY년 MM월 DD일'),
      end: endOfWeek.format('YYYY년 MM월 DD일'),
    }
  }

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setWeekRange(getWeekRange(date))
  }

  return (
    <div className="relative h-screen font-gothic-b text-brown ">
      <Image src="/image/record_background.svg" alt="" fill objectFit="cover" />
      <div className="absolute w-full">
        <Header backOnClick={() => alert('onClick!')} title="탄소 기록함" />
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        <div className="flex flex-col gap-[35px] w-100% h-100% py-12 px-5 bg-[#D3EDE8]">
          <TodayEcoStats selectedDate={selectedDate} />
          <WeeklyEcoChart weekRange={weekRange} />
        </div>
      </div>
    </div>
  )
}
