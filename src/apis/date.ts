import { createSupabaseBrowserClient } from '@/utils/client/supabase'

import { updateUser } from '@/utils/user/user'

const supabase = createSupabaseBrowserClient()

// date 정보 가져오기
export const getDateInfo = async (user_id: string) => {
  const { data, error } = await supabase.from('date').select('*').eq('user_id', user_id)

  return { data, error }
}

// 목표 거리 업데이트
export const updateGoal = async (user_id: string, goal: number) => {
  try {
    await updateUser(user_id, 'goal', goal)
    console.log('Goal updated successfully.')
  } catch (error) {
    console.log(error)
  }
}

// carbon 계산
export const updateCarbon = async (user_id: string) => {
  const dateInfo = await getDateInfo(user_id)

  const distance = dateInfo?.data?.[0]?.distance

  if (!distance) {
    console.log('No Distance')
    return
  }

  const carbon = (distance / 16.04) * 2.097

  const { error } = await supabase.from('date').update({ carbon }).eq('user_id', user_id)

  if (error) {
    console.log('Error', error)
  }
}
