export interface AuthUserInfo {
  id: string
  email: string
  avatar_url: string
}

export interface User extends AuthUserInfo {
  nickname: string
  goal: number
  point: number
}

export type UpdateUserFn = (
  user_id: string,
  target: 'nickname' | 'avatar_url' | 'goal' | 'point',
  changeContent: string | number,
) => Promise<boolean>
