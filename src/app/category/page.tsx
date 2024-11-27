'use client'

import { useUpdatedCategoryList } from '../hook/useUpdatedCategoryList'
import { useEffect, useState, useCallback } from 'react'
import { CategoryName } from '@/types/CategoryField'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'
import {
  createCategoryProgress,
  getCategoryIdByName,
  getCategoryProgressIsCompleted,
} from '@/apis/category'
import { getUserId } from '@/apis/user'

export default function ChooseCategory() {
  const { categoryListWithStatus, isLoading } = useUpdatedCategoryList()
  const [selectCategory, setSelectCategory] = useState<CategoryName>(
    null as unknown as CategoryName,
  )
  const router = useRouter()

  // TODO: 주석 제거 예정
  // // 접근 권한을 확인하고, 조건에 따라 리다이렉션
  // const checkAccess = useCallback(async () => {
  //   try {
  //     const userId = (await getUserId()) as string
  //     const data = await getCategoryProgressIsCompleted(userId)
  //     const hasIncompleteProgress = data?.some(item => !item.is_completed)
  //     if (hasIncompleteProgress) router.push('/')
  //   } catch (error) {
  //     console.error('Failed to check access:', error)
  //   }
  // }, [router])

  // // 컴포넌트 마운트 시 접근 권한 확인
  // useEffect(() => {
  //   checkAccess()
  // }, [checkAccess])

  // 선택된 카테고리로 진행을 생성하고 홈으로 리다이렉션
  const clickHandler = useCallback(async () => {
    try {
      localStorage.setItem(
        'category',
        JSON.stringify({
          id: await getCategoryIdByName(selectCategory),
          name: selectCategory,
        }),
      )
      const userId = (await getUserId()) as string
      await createCategoryProgress(userId, selectCategory)
      router.push('/')
    } catch (error) {
      console.error('Failed to create category progress:', error)
    }
  }, [selectCategory, router])

  if (isLoading) return <Loading />

  return (
    <main className="w-full h-screen text-center py-[57px] flex flex-col justify-center items-center">
      <div className="font-sindinaru-m">
        <h1 className="text-[15px] text-brown mb-[20px]">회복하고 싶은 캐릭터를 골라주세요</h1>
        <span className="block w-[121px] h-[40px] leading-[40px] rounded-[15px] m-auto bg-white border-none text-dark-brown">
          {selectCategory}
        </span>
      </div>
      <CategoryField
        categoryList={categoryListWithStatus}
        isClickable
        setSelectCategory={setSelectCategory}
      />
      <div className="h-[40px] flex items-center justify-center">
        {selectCategory && (
          <Button
            width={303}
            height={40}
            fontSize={20}
            color="text-medium-brown"
            backgroundColor="bg-yellow"
            onClick={clickHandler}
          >
            다음
          </Button>
        )}
      </div>
    </main>
  )
}
