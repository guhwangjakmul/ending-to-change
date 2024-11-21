// Supabase 클라이언트를 생성하여 인증 및 데이터베이스 작업에 이용
import { createSupabaseBrowserClient } from '../client/supabase'

/**
 * 현재 로그인한 사용자의 id를 가져오는 함수
 * @returns {Promise<string | void>} - 로그인 상태인 경우 유저 id, 실패 시 콘솔에 오류 메시지 출력
 */
export const getUserId = async () => {
  const supabase = createSupabaseBrowserClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) return console.error('Failed to find user:', error.message)
  return data.user.id
}

/**
 * 소셜 로그인을 처리하는 함수
 * @param {'google' | 'kakao'} target  - 소셜 로그인 제공자('google' 또는 'kakao')
 * @returns {Promise<void>} - 소셜 로그인 성공 여부
 */
export const onClickSocialLogin = async (target: 'google' | 'kakao') => {
  const supabase = createSupabaseBrowserClient()
  await supabase.auth.signInWithOAuth({
    provider: `${target}`,
    options: {
      redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
    },
  })
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
  await supabase.auth.signOut()
  window.location.href = '/auth'
}
