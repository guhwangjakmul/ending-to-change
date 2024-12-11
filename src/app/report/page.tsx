'use client'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import dynamic from 'next/dynamic'

import Header from '@/components/common/header/Header'
import DistanceSetting from '@/components/report/distanceSetting/DistanceSetting'
import Calendar from '@/components/report/calendar/Calendar'
import TodayEcoStats from '@/components/report/TodayEcoStats'

// WeeklyEcoChart를 동적으로 로드
const WeeklyEcoChart = dynamic(() => import('@/components/report/WeeklyEcoChart'), {
  ssr: false, // 서버사이드 렌더링 비활성화
  loading: () => <div>Loading Chart...</div>, // 로딩 중 표시할 컴포넌트
})

import { DateInfo } from '@/types/Date'
import { getDateInfo, updateGoal } from '@/apis/date'
import { getUserInfo } from '@/apis/user'
import useUserStore from '@/store/useUserStore'
import Loading from '../loading'

export default function Page() {
  const [dateInfo, setDateInfo] = useState<DateInfo[]>([])
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null)
  const [weekRange, setWeekRange] = useState<{ start: string; end: string } | null>(null)
  const [filteredWeeklyData, setFilteredWeeklyData] = useState<DateInfo[]>([])
  const [goalKm, setGoalKm] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const { userId } = useUserStore()

  useEffect(() => {
    const fetchDateInfo = async () => {
      if (!userId) {
        console.error('User ID가 없습니다.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        // 사용자 목표 거리 가져오기
        const userGoal = await getUserInfo(userId)
        setGoalKm(userGoal?.[0].goal || 3)

        // 날짜 정보 가져오기
        const data = await getDateInfo(userId)
        setDateInfo(data || [])

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

        // 오늘 날짜 기준으로 주간 범위 설정 및 필터링
        const initialWeekRange = getWeekRange(new Date())
        setWeekRange(initialWeekRange)
        filterWeeklyData(data, initialWeekRange) // 데이터를 필터링
      } catch (error) {
        console.error('fetchDateInfo 실행 중 에러 발생', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDateInfo()
  }, [userId])

  const updateGoalKm = async (newGoal: number) => {
    try {
      setGoalKm(newGoal)
      if (!userId) throw new Error('User ID가 없습니다.')

      await updateGoal(userId, newGoal) // DB 업데이트
    } catch (error) {
      console.error('goal 업데이트하는데 실패했습니다.:', error)
    }
  }

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
      if (!userId) throw new Error('User ID가 없습니다.')

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
    filterWeeklyData(dateInfo, range) // 데이터 필터링
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
  const filterWeeklyData = (data: DateInfo[], range: { start: string; end: string }) => {
    const filteredData = data.filter(item =>
      moment(item.created_at).isBetween(range.start, range.end, null, '[]'),
    )
    setFilteredWeeklyData(filteredData)
  }

  // 페이지 초기 렌더링 시 데이터 필터링 보장
  useEffect(() => {
    if (!isLoading && dateInfo.length > 0 && weekRange) {
      console.log('필터링 실행')
      filterWeeklyData(dateInfo, weekRange)
    }
  }, [dateInfo, weekRange, isLoading])

  if (isLoading) return <Loading />

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
        <Header title="탄소 기록함" />
        <div>
          <Calendar
            dateInfo={dateInfo}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col justify-center px-5 bg-[#D3EDE8] xl:h-[70%]">
          <DistanceSetting goalKm={goalKm} updateGoalKm={updateGoalKm} />
          <TodayEcoStats selectedDate={selectedDate} goalKm={goalKm} />
          <Suspense fallback={<div>차트를 로드 중입니다...</div>}>
            <WeeklyEcoChart weekRange={weekRange} filteredWeeklyData={filteredWeeklyData} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
