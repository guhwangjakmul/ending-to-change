'use client'

import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { getUserInfo, updateUser } from '@/utils/user/user'

const supabase = createSupabaseBrowserClient()

// 특정 사용자가 풀지 않은 퀴즈 가져오기
export const getUnsolvedQuizzes = async (user_id: string, category_id: number) => {
  const { data: quizData, error: quizError } = await supabase
    .from('quiz')
    .select('*')
    .eq('category_id', category_id)

  if (quizError) {
    console.error('퀴즈 데이터 가져오는 에러 발생:', quizError.message)
    return []
  }

  const { data: quizLogs, error: quizLogError } = await supabase
    .from('quiz_log')
    .select('*')
    .eq('user_id', user_id)

  if (quizLogError) {
    console.error('퀴즈 로그 데이터 가져오는 에러 발생', quizLogError.message)
    return []
  }

  const solvedQuizIds = quizLogs?.map(quizLog => quizLog.quiz_id) || []
  const unSolvedQuizzes = quizData?.filter(quiz => !solvedQuizIds.includes(quiz.id)) || []

  return unSolvedQuizzes
}

// 사용자 point 업데이트
export const updateUserPoint = async (user_id: string, point: number) => {
  try {
    const userInfo = await getUserInfo(user_id)

    if (!userInfo || userInfo.length === 0) {
      console.error('사용자를 찾을 수 없음')
      return
    }

    const currentPoint = userInfo[0].point ?? 0
    const newPoint = currentPoint + point

    if (isNaN(newPoint)) {
      throw new Error('포인트 값이 유효하지 않음')
    }

    const isUpdated = await updateUser(user_id, 'point', newPoint)

    if (!isUpdated) {
      console.error('사용자 포인트를 업데이트 못함')
      return
    }
  } catch (error) {
    console.error('사용자 포인트 업데이트 중 오류가 발생', error)
  }
}

// 퀴즈 로그 저장
export const insertQuizLog = async (quiz_id: number, user_id: string) => {
  const { error } = await supabase.from('quiz_log').insert({ quiz_id, user_id })

  if (error) {
    throw new Error(`퀴즈 로그 저장에 실패: ${error.message}`)
  }
}
