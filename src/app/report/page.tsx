'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'

import Header from '@/components/common/header/Header'
import DistanceSetting from '@/components/report/distanceSetting/DistanceSetting'
import Calendar from '@/components/report/calendar/Calendar'
import TodayEcoStats from '@/components/report/TodayEcoStats'
import WeeklyEcoChart from '@/components/report/WeeklyEcoChart'
import { getDateInfo } from '@/apis/date'

import { Database } from '@/types/supabase'

type DateInfo = Database['public']['Tables']['date']['Row']

export default function page() {
  const [dateInfo, setDateInfo] = useState<DateInfo[]>([])
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null)
  const [goalKm, setGoalKm] = useState(3)
  const [weekRange, setWeekRange] = useState<{ start: string; end: string } | null>(null)
  const [filteredWeeklyData, setFilteredWeeklyData] = useState<DateInfo[]>([])

  const userId = '47dd1195-11d0-4227-b42e-e7e6ad96045b' // 테스트용 사용자 ID

  useEffect(() => {
    const fetchDateInfo = async () => {
      try {
        const { data, error } = await getDateInfo(userId)

        if (error) {
          console.log(error)
          return
        }

        if (data) {
          setDateInfo(data || [])
        }

        // 오늘 날짜의 데이터를 초기값으로 설정
        const todayFormatted = moment(new Date()).format('YYYY-MM-DD')
        const todayRecord = data?.find(
          item => moment(item.created_at).format('YYYY-MM-DD') === todayFormatted,
        )

        setSelectedDate(
          todayRecord || {
            id: 0,
            created_at: todayFormatted,
            distance: 0,
            carbon: 0,
            user_id: userId,
          },
        )
      } catch (error) {
        console.log(error)
      }
    }

    fetchDateInfo()
  }, [userId])

  const handleDateChange = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    const record = dateInfo.find(item => {
      const recordDate = moment(item.created_at).format('YYYY-MM-DD')
      return recordDate === formattedDate
    })

    // 선택된 날짜의 데이터를 설정
    if (record) {
      setSelectedDate(record)
    } else {
      setSelectedDate({
        id: 0,
        created_at: formattedDate,
        distance: 0,
        carbon: 0,
        user_id: userId,
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
    const filteredData = dateInfo.filter(
      item => item.created_at >= range.start && item.created_at <= range.end,
    )
    setFilteredWeeklyData(filteredData)
  }

  // 페이지 초기 로드 시 오늘 기준으로 일주일 설정
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
            dateInfo={dateInfo}
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
