'use client'
import Image from 'next/image'
import { useState } from 'react'

import Header from '@/components/common/header/Header'
import Calendar from '@/components/report/Calendar'
import TodayEcoStats from '@/components/report/TodayEcoStats'
import WeeklyEcoChart from '@/components/report/WeeklyEcoChart'

export default function page() {
  // 선택한 날짜를 상태로 관리
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <div className="relative h-screen font-gothic-b text-brown ">
      <Image src="/image/record_background.svg" alt="" fill objectFit="cover" />
      <div className="absolute w-full">
        <Header backOnClick={() => alert('onClick!')} title="탄소 기록함" />
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <div className="flex flex-col gap-[35px] w-100% h-100% py-12 px-5 bg-[#D3EDE8]">
          <TodayEcoStats selectedDate={selectedDate} />
          <WeeklyEcoChart />
        </div>
      </div>
    </div>
  )
}
