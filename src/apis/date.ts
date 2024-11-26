import { createSupabaseBrowserClient } from '@/utils/client/supabase'

import { updateUser } from './user'

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

// carbon 계산
export const updateCarbon = async (user_id: string, distance: number): Promise<void> => {
  try {
    const carbon = parseFloat(((distance / 16.04) * 2.097).toFixed(1))

    const { error } = await supabase
      .from('date')
      .insert({ distance, carbon })
      .eq('user_id', user_id)

    if (error) {
      throw new Error('탄소 배출량 업데이트 실패')
    }
  } catch {
    console.error('탄소 배출량 업데이트 중 에러 발생')
  }
}
