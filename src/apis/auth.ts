import useUserStore from '@/store/useUserStore'
import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { removeLocalStorage } from '@/utils/common/localStorage'
import { getUserId } from './user'
import { getCategoryProgress } from './category'

/**
 * 소셜 로그인을 처리하는 함수
 * @param {'google' | 'kakao'} target  - 소셜 로그인 제공자('google' 또는 'kakao')
 * @returns {Promise<void>} - 소셜 로그인 성공 여부
 */
export const onClickSocialLogin = async (provider: 'google' | 'kakao') => {
  const supabase = createSupabaseBrowserClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
    },
  })

  if (error) return console.error(`${provider} 로그인에 실패했습니다.`, error.message)

  try {
    // 로그인 성공 후 데이터 초기화
    const userId = (await getUserId()) || ''
    const categoryProgress = await getCategoryProgress(userId)
    const incompleteCategory = categoryProgress.find(category => !category.is_completed)

    const categoryId = incompleteCategory?.category_id || 0

    // Zustand 초기화
    const { setUserId, setCategoryId } = useUserStore.getState()
    setUserId(userId)
    setCategoryId(categoryId)

    // 로컬스토리지 업데이트
    localStorage.setItem('user-store', JSON.stringify({ userId, categoryId }))
  } catch (error) {
    console.error('Zustand 초기화 중 오류 발생:', error)
  }
}

/**
 * 구글 소셜 로그인
 * @returns {Promise<void>} - 소셜 로그인 성공 여부
 */
export const onClickGoogle = async () => await onClickSocialLogin('google')

/**
 * 카카오 소셜 로그인
 * @returns {Promise<void>} - 소셜 로그인 성공 여부
 */
export const onClickKakao = async () => await onClickSocialLogin('kakao')

/**
 * 로그아웃을 처리하는 함수
 * 로그아웃 후 메인 페이지('/')로 리다이렉트
 * @returns {Promise<void>}
 */
export const onClickLogout = async () => {
  const supabase = createSupabaseBrowserClient()

  const { error } = await supabase.auth.signOut()
  if (error) return console.error('로그아웃에 실패했습니다.', error.message)

  // zustand user-store 제거
  const clearUserStore = useUserStore.getState().clearUser
  clearUserStore()
  localStorage.removeItem('user-store')

  removeLocalStorage('category')
  window.location.href = '/auth'
}
