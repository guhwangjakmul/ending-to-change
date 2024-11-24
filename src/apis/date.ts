import { updateUser } from '@/utils/user/user'

// date 정보 가져오기

// 목표 거리 업데이트
export const updateGoal = async (user_id: string, goal: number) => {
  try {
    await updateUser(user_id, 'goal', goal)
    console.log('Goal updated successfully.')
  } catch (error) {
    console.log(error)
  }
}
