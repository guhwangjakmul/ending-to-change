import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { getUserInfo, updateUser } from '@/utils/user/user'

const supabase = createSupabaseBrowserClient()

export const getProgress = async (user_id: string, category_id: number) => {
  const { data, error } = await supabase
    .from('category_progress')
    .select('progress')
    .eq('user_id', user_id)
    .eq('category_id', category_id)
    .single()

  if (error) {
    console.error('데이터 패칭 실패', error)
    return null
  }
  return data?.progress
}

export const upgradeProgress = async (user_id: string, category_id: number) => {
  try {
    const currentProgress = await getProgress(user_id, category_id)
    await supabase
      .from('category_progress')
      .update({ progress: currentProgress! + 10 }) //오류가능성
      .eq('user_id', user_id)
      .eq('category_id', category_id)
  } catch (error) {
    console.error('Error in decreaseUserPoint:', error)
  }
}

export const getPotion = async (user_id: string) => {
  const { data, error } = await supabase
    .from('user')
    .select('point')
    .eq('user_id', user_id)
    .single()

  if (error) {
    console.error('데이터 패칭 실패', error)
    return null
  }
  return data?.point
}

// 사용자 point 사용, 업데이트
export const usePotion = async (user_id: string) => {
  try {
    // 사용자 정보 가져오기
    const userInfo = await getUserInfo(user_id)
    if (!userInfo || userInfo.length === 0) {
      console.error('User not found.')
      return
    }

    const currentPoint = userInfo[0].point ?? 0
    if (currentPoint > 0) {
      const newPoint = currentPoint - 1

      const isUpdated = await updateUser(user_id, 'point', newPoint)

      if (!isUpdated) {
        console.error('Failed to update user points.')
        return
      }
      return newPoint
    }
  } catch (error) {
    console.error('Error in decreaseUserPoint:', error)
  }
}
