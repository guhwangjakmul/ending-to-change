import { AuthUserInfo } from '@/types/User'
import { createSupabaseBrowserClient } from '../client/supabase'
import { createUser } from './user'

/**
 * [GET] 현재 인증된 사용자의 정보를 가져오고 데이터베이스에 있는지 확인
 * - 인증된 사용자 정보가 데이터베이스에 없으면 새로 생성
 * @returns {Promise<void>} - 작업 완료 후 로그로 결과 출력
 */
export const getUserFromAuth = async () => {
  const supabase = createSupabaseBrowserClient()

  // 현재 로그인된 사용자 정보
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) return console.error('Failed to fetch user Info:', error.message)

  // 인증된 사용자 정보
  const currentUser: AuthUserInfo = {
    id: data.user.id,
    email: data.user.email!,
    avatar_url: data.user.user_metadata?.avatar_url,
  }

  // 데이터베이스에서 해당 사용자 정보 조회
  const { data: existingUser, error: checkError } = await supabase
    .from('user')
    .select('*')
    .eq('email', currentUser.email)
    .maybeSingle()

  if (checkError) {
    if (checkError.code === 'PGRST116')
      return console.error('Multiple or no rows returned for this email')
    return console.error('Error checking user:', checkError.message)
  }

  // 사용자 정보가 데이터베이스에 없으면 새로 생성
  if (!existingUser) await createUser(currentUser)
}
