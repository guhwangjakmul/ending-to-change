'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'

import Header from '@/components/common/header/Header'
import DistanceSetting from '@/components/report/distanceSetting/DistanceSetting'
import Calendar from '@/components/report/calendar/Calendar'
import TodayEcoStats from '@/components/report/TodayEcoStats'
import WeeklyEcoChart from '@/components/report/WeeklyEcoChart'

import { DateRecord } from '@/types/Date'

export default function page() {
  // 선택한 날짜와 일주일을 상태로 관리
  const [selectedDate, setSelectedDate] = useState<DateRecord | null>(null)
  const [weekRange, setWeekRange] = useState<{ start: string; end: string } | null>(null)
  const [filteredWeeklyData, setFilteredWeeklyData] = useState<DateRecord[]>([])
  // 목표 거리 설정 default 3km
  const [goalKm, setGoalKm] = useState<number>(3)
  const userId = '47dd1195-11d0-4227-b42e-e7e6ad96045b' // 테스트용 사용자 ID

  // 일주일치 임시 데이터
  const weeklyData: DateRecord[] = [
    { id: 1, date: '2024-11-11', distance: 2.3, carbon: 0.5 },
    { id: 2, date: '2024-11-12', distance: 3.1, carbon: 0.7 },
    { id: 3, date: '2024-11-13', distance: 4.0, carbon: 0.9 },
    { id: 4, date: '2024-11-14', distance: 2.8, carbon: 0.6 },
    { id: 5, date: '2024-11-15', distance: 3.5, carbon: 0.8 },
    { id: 6, date: '2024-11-16', distance: 2.0, carbon: 0.4 },
    { id: 7, date: '2024-11-17', distance: 3.2, carbon: 0.7 },
  ]

  const handleDateChange = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    const record = weeklyData.find(item => item.date === formattedDate)

    if (record) {
      setSelectedDate(record)
    } else {
      setSelectedDate({
        id: 0,
        date: formattedDate,
        distance: 0,
        carbon: 0,
      })
    }

    const range = getWeekRange(date)
    setWeekRange(range)
    filterWeeklyData(range)
  }

  // 주간 범위를 계산하는 함수
  const getWeekRange = (date: Date) => {
    const startOfWeek = moment(date).startOf('isoWeek')
    const endOfWeek = moment(date).endOf('isoWeek')
    return {
      start: startOfWeek.format('YYYY-MM-DD'),
      end: endOfWeek.format('YYYY-MM-DD'),
    }
  }

  // 주간 범위에 맞는 데이터를 필터링하는 함수
  const filterWeeklyData = (range: { start: string; end: string }) => {
    const filteredData = weeklyData.filter(
      item => item.date >= range.start && item.date <= range.end,
    )
    setFilteredWeeklyData(filteredData)
  }

  // 페이지 초기 로드 시 오늘 기준으로 일주일 설정
  // 오늘 날짜만 보여주는 경우에는 useState로 초기값을 현재 날짜로 설정하기 때문에 별도의 초기화 코드 필요 x -> 상태 초기화 할 때 자동으로 오늘 날짜 설정
  // 일주일 범위를 보여주는 경우는 오늘 날짜를 기준으로 한 주간 범위를 계산해야 하므로, useEffect를 사용해 한 번만 실행되는 초기화 코드로 설정
  useEffect(() => {
    const initialWeekRange = getWeekRange(new Date())
    setWeekRange(initialWeekRange)
  }, [])

  return (
    <div className="relative h-screen font-gothic-b text-brown ">
      <Image
        src="/image/record_background.svg"
        alt=""
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="absolute w-full h-full flex flex-col justify-between">
        <Header backOnClick={() => alert('onClick!')} title="탄소 기록함" />
        <div>
          <Calendar
            weeklyData={weeklyData}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col justify-center px-5 bg-[#D3EDE8] xl:h-[70%]">
          <DistanceSetting goalKm={goalKm} setGoalKm={setGoalKm} />
          <TodayEcoStats selectedDate={selectedDate} goalKm={goalKm} />
          <WeeklyEcoChart weekRange={weekRange} filteredWeeklyData={filteredWeeklyData} />
        </div>
      </div>
    </div>
  )
}
