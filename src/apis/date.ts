import { createSupabaseBrowserClient } from '@/utils/client/supabase'

import { updateUser } from './user'
import { getTodayDate } from '@/utils/common/getTodayDate'

const supabase = createSupabaseBrowserClient()

// date 정보 가져오기
export const getDateInfo = async (user_id: string) => {
  try {
    const { data, error } = await supabase.from('date').select('*').eq('user_id', user_id)

    if (error) {
      throw new Error(`날짜 정보를 가져오는 에러 발생: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error('getDateInfo 함수 실행 중 오류', error)
    return []
  }
}

// 목표 거리 업데이트
export const updateGoal = async (user_id: string, goal: number) => {
  try {
    await updateUser(user_id, 'goal', goal)
  } catch (error) {
    console.error('목표 거리 업데이트 중 에러 발생', error)
  }
}

// 걸은 거리와 탄소량 저장 함수
export const updateWalkDistance = async (user_id: string, distance: number): Promise<void> => {
  try {
    const today = getTodayDate()

    const convertedDistance = parseFloat((distance / 1000).toFixed(3))

    // 탄소 배출량 계산
    const carbon = parseFloat(((convertedDistance / 16.04) * 2.097).toFixed(1))

    const { error } = await supabase
      .from('date')
      .insert({ user_id, distance: convertedDistance, carbon, created_at: today })

    if (error) {
      throw new Error(`거리 및 탄소 데이터 저장 실패:${error.message} `)
    }

    // 오늘 날짜와 거리 로그 출력
    console.log(`오늘 날짜: ${today}`)
    console.log(`오늘 걸은 거리: ${convertedDistance}km`)
  } catch (error) {
    console.log('updateWalkDistance 실행 중 오류:', error)
  }
}
