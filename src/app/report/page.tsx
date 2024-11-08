'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'

import Header from '@/components/common/header/Header'
import DistanceSetting from '@/components/report/DistanceSetting'
import Calendar from '@/components/report/calendar/Calendar'
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

  // 페이지 초기 로드 시 오늘 기준으로 일주일 설정
  // 오늘 날짜만 보여주는 경우에는 useState로 초기값을 현재 날짜로 설정하기 때문에 별도의 초기화 코드 필요 x -> 상태 초기화 할 때 자동으로 오늘 날짜 설정
  // 일주일 범위를 보여주는 경우는 오늘 날짜를 기준으로 한 주간 범위를 계산해야 하므로, useEffect를 사용해 한 번만 실행되는 초기화 코드로 설정
  useEffect(() => {
    const initialWeekRange = getWeekRange(new Date())
    setWeekRange(initialWeekRange)
  }, [])

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
        <div className=" w-100% h-100% py-[18px] px-5 bg-[#D3EDE8]">
          <DistanceSetting />
          <TodayEcoStats selectedDate={selectedDate} />
          <WeeklyEcoChart weekRange={weekRange} />
        </div>
      </div>
    </div>
  )
}
