import { AuthUserInfo, UpdateUserFn } from '@/types/User'
import { createSupabaseBrowserClient } from '../client/supabase'
import { getRandomNickname } from './nicknameList'

/**
 * [GET] 사용자 정보를 가져오는 함수
 * @param {string} id  - 유저 id
 * @returns {Promise<User[] | void>} - 사용자 정보 배열 또는 오류 메시지 출력
 */
export const getUserInfo = async (id: string) => {
  if (!id) return console.error('user id is missing')
  const supabase = await createSupabaseBrowserClient()

  const { data, error } = await supabase.from('user').select('*').eq('user_id', id)

  if (error) return console.error('failed to fetch user info', error.message)
  return data
}

/**
 * [POST] 새로운 사용자를 생성하는 함수
 * @param {AuthUserInfo} authUserInfo - 인증된 사용자 정보
 * @returns {Promise<void>} - 성공 여부 출력
 */
export const createUser = async (authUserInfo: AuthUserInfo) => {
  const { id: user_id, email, avatar_url } = authUserInfo
  const supabase = await createSupabaseBrowserClient()
  const { error } = await supabase.from('user').insert({
    user_id,
    email,
    avatar_url,
    nickname: getRandomNickname(),
    goal: 3,
    point: 0,
  })

  if (error) return console.error('Failed to create user', error.message)
  console.log('Succeeded create user')
}

/**
 * [UPDATE] 사용자 정보를 수정하는 함수
 * @param {string} user_id - 유저 id
 * @param {string} target - 수정할 필드 이름(nickname, avatar_url, goal, point 중 하나)
 * @param {string | number} changeContent - 수정할 값
 * @returns {Promise<boolean>} - 수정 성공 여부
 */

export const updateUser: UpdateUserFn = async (user_id, target, changeContent) => {
  const supabase = await createSupabaseBrowserClient()

  const { error } = await supabase
    .from('user')
    .update({ [target]: changeContent })
    .eq('user_id', user_id)

  if (error) {
    console.error('Failed to update user', error.message)
    return false
  }

  console.log('Succeeded in updating user')
  return true
}
