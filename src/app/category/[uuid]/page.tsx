'use client'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'
import UserProfile from '@/components/user/UserProfile'
import Image from 'next/image'
import type { User } from '../../hook/useFetchUserInfo'
import { getUserInfo, getUserIsAllClear } from '@/apis/user'
import { getAllCategoryList } from '@/apis/category'
import { useEffect, useState } from 'react'
import { Category, CategoryName } from '@/types/CategoryField'
import Loading from '@/app/loading'
import { useRouter, usePathname } from 'next/navigation'

export default function AllClear() {
  const router = useRouter()
  const pathname = usePathname()
  const userUuid = pathname.split('/').pop() as string

  const [user, setUser] = useState<User>(null as unknown as User)
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const clickHandler = () => {
    navigator.clipboard.writeText(window.location.href).then(res => {
      alert('주소가 복사되었습니다!')
    })
  }

  useEffect(() => {
    ;(async () => {
      const userInfo = await getUserInfo(userUuid)
      const isUserAllClear = await getUserIsAllClear(userUuid)

      if (!userInfo || !isUserAllClear) {
        router.push('/not-found')
      }

      if (userInfo && userInfo.length > 0) {
        setUser({
          user_id: userInfo[0].user_id,
          nickname: userInfo[0].nickname,
          avatar_url: userInfo[0].avatar_url,
        })
      }
      const allCategoryList = await getAllCategoryList()
      const formattedCategoryList: Category[] = allCategoryList.map(data => ({
        name: data.name as CategoryName,
        status: 'completed',
      }))
      setCategoryList(formattedCategoryList)
    })()
  }, [])

  return user && categoryList.length ? (
    <main className="w-full h-screen py-[70px] flex flex-col justify-center items-center">
      <UserProfile size={100} imgSrc={user.avatar_url} />
      <div className="text-center mt-[30px]">
        <h1 className="text-sky-blue text-[20px] font-gothic-b mb-[4px]">
          {user.nickname}님, 축하합니다!
        </h1>
        <span className="text-brown text-[16px] font-gothic-m">
          지구가 다시 살아났어요! <br />
          지구의 결말을 바꾼 멋진 주인공이 되었네요
        </span>
      </div>
      <CategoryField isClickable={false} categoryList={categoryList} />
      <Button width={114} height={41} fontSize={16} onClick={clickHandler}>
        <Image src="/image/share.svg" alt="" width="21" height="17" className="mr-[5px]" />
        공유하기
      </Button>
    </main>
  ) : (
    <Loading />
  )
}
