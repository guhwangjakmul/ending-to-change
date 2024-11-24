'use client'
import CategoryField from '@/components/common/CategoryField'
import UserProfile from '@/components/user/UserProfile'
import { useEffect, useState } from 'react'
import { getCompletedCategoryList } from '@/apis/category'
import { Category, CategoryName } from '@/types/CategoryField'
import { getUserId, getUserInfo } from '@/apis/user'

export default function MyPage() {
  const [user, setUser] = useState({ user_id: '', nickname: '', avatar_url: '' })
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await getUserId()
      if (!userId) return console.error('User ID not found')

      const userInfo = await getUserInfo(userId)
      if (userInfo) {
        setUser({
          user_id: userId,
          nickname: userInfo[0].nickname,
          avatar_url: userInfo[0].avatar_url,
        })

        const completedCategoryList = await getCompletedCategoryList(userId)
        setCategoryList(
          completedCategoryList.map(data => ({
            name: data.name as CategoryName,
            status: 'completed',
          })),
        )
      }
    }
    fetchUserInfo()
  }, [])

  return (
    <main className="w-full h-[calc(100%-44px)] flex items-center flex-col p-[35px] overflow-hidden">
      <div className="w-full flex items-center gap-[15px] mt-[44px] mx-[35px]">
        <UserProfile size={50} isEditable={false} imgSrc={user.avatar_url} />
        <span className="font-gothic-m text-brown text-[12px] whitespace-nowrap">
          {user.nickname || '구해줘요 동물의 숲'}님<br /> 현재 뱃지 {categoryList.length}개를
          획득했어요
        </span>
      </div>
      <div className="w-full h-screen flex justify-center">
        <CategoryField categoryList={categoryList} />
      </div>
    </main>
  )
}
