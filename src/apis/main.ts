import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { getUserInfo, updateUser } from './user'

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
    const validProgress = currentProgress ?? 0

    const { error: updateError } = await supabase
      .from('category_progress')
      .update({ progress: validProgress + 10 })
      .eq('user_id', user_id)
      .eq('category_id', category_id)

    if (updateError) {
      throw new Error(`Failed to update progress: ${updateError.message}`)
    }
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

// export const getCompletedCategoryCount = async (user_id: string) => {
//   try {
//     const { count, error } = await supabase
//       .from('category_progress')
//       .select('*', { count: 'exact', head: true })
//       .eq('user_id', user_id)
//       .eq('is_completed', true)

//     if (error) {
//       console.error('is_completed 데이터 개수 가져오기 실패:', error)
//       return null
//     }

//     return count || 0 // count가 null이면 0 반환
//   } catch (error) {
//     console.error('getCompletedCategoryCount 오류:', error)
//     return null
//   }
// }

export const updateIsAllCompleted = async (user_id: string) => {
  try {
    // category_progress 테이블에서 user_id에 해당하는 레코드 확인
    const { data, error: progressError } = await supabase
      .from('category_progress')
      .select('is_completed')
      .eq('user_id', user_id)

    if (progressError) {
      throw new Error(`Failed to fetch category_progress: ${progressError.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error(`No category_progress records found for user_id: ${user_id}`)
    }

    // 레코드 개수 확인
    const hasSixRecords = data.length === 6
    // 모든 레코드의 is_completed가 true인지 확인
    const allCompleted = data.every(item => item.is_completed === true)

    // user 테이블의 isAllCompleted 값 업데이트
    if (hasSixRecords && allCompleted) {
      const { error: userError } = await supabase
        .from('user')
        .update({ is_all_clear: true })
        .eq('user_id', user_id)

      if (userError) {
        throw new Error(`Failed to update user table: ${userError.message}`)
      }

      console.log(`User ${user_id} isAllCompleted updated to: ${allCompleted}`)
    }
  } catch (error) {
    console.error('Error in updateIsAllCompleted:', error)
  }
}

export const getIsAllCompleted = async (user_id: string): Promise<boolean | null> => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('is_all_clear')
      .eq('user_id', user_id)
      .single()

    if (error) {
      console.error('Error fetching is_all_clear:', error)
      return null
    }

    return data?.is_all_clear ?? null // 값이 없으면 null 반환
  } catch (error) {
    console.error('Unexpected error in getIsAllCompleted:', error)
    return null
  }
}
