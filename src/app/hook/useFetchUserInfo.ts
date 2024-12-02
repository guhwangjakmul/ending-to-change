'use client'
import { useEffect, useState } from 'react'
import { getCompletedCategoryList } from '@/apis/category'
import { getUserId, getUserInfo } from '@/apis/user'
import { Category, CategoryName } from '@/types/CategoryField'

export interface User {
  user_id: string
  nickname: string
  avatar_url: string
}

interface UseFetchUserInfoResult {
  user: User
  categoryList: Category[]
  isLoading: boolean
  error: string | null
}

// 사용자 정보 및 완료된 카테고리 목록 가져오는 커스텀 훅
export function useFetchUserInfo(): UseFetchUserInfoResult {
  const [user, setUser] = useState<User>({ user_id: '', nickname: '', avatar_url: '' })
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await getUserId()
        if (!userId) throw new Error('사용자 ID를 찾을 수 없습니다.')

        const userInfo = await getUserInfo(userId)
        if (!userInfo) throw new Error('사용자 정보를 찾을 수 없습니다.')

        setUser({
          user_id: userId,
          nickname: userInfo[0].nickname,
          avatar_url: userInfo[0].avatar_url,
        })

        const completedCategoryList = await getCompletedCategoryList(userId)
        setCategoryList(
          completedCategoryList.map(data => ({
            id: data.id,
            name: data.name as CategoryName,
            status: 'completed',
          })),
        )
      } catch (err) {
        setError((err as Error).message)
        console.error('오류 발생:', (err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  return { user, categoryList, isLoading, error }
}
