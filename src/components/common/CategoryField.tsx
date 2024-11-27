'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import SpotButton from './SpotButton'
import { Category, CategoryFieldProps } from '@/types/CategoryField'
import { useEffect, useState, useCallback } from 'react'
import { getCategoryIdByName } from '@/apis/category'

export default function CategoryField(props: CategoryFieldProps) {
  const { categoryList, isClickable = false, onClick, setSelectCategory } = props
  const pathname = usePathname()
  const router = useRouter()

  const [useCategoryList, setUseCategoryList] = useState(categoryList)

  // 주어진 카테고리의 상태가 클릭 가능한지 확인
  const isCategoryClickable = useCallback(
    (categoryStatus: string) => {
      if (!isClickable) return false
      if (pathname === '/category' && categoryStatus === 'completed') return false
      return true
    },
    [pathname, isClickable],
  )

  // 클릭된 카테고리의 상태 업데이트
  const updateCategoryStatus = useCallback((clickedCategoryName: string) => {
    setUseCategoryList(prevList =>
      prevList.map(category => {
        if (category.name === clickedCategoryName) {
          if (category.status === 'completed') return category
          return { ...category, status: 'selected' }
        }
        if (category.status !== 'completed') return { ...category, status: 'default' }
        return category
      }),
    )
  }, [])

  // 버튼 클릭 시 호출되는 핸들러 함수
  const buttonClickHandler = useCallback(
    async (category: Category) => {
      const { name, status } = category

      if (setSelectCategory && status !== 'completed') setSelectCategory(name)
      if (!isCategoryClickable(status!)) return
      if (pathname === '/mypage' && status === 'completed') {
        localStorage.setItem(
          'viewResultCategory',
          JSON.stringify({
            id: await getCategoryIdByName(name),
            name,
          }),
        )
        router.push('/')
      }
      updateCategoryStatus(name)
    },
    [isCategoryClickable, pathname, setSelectCategory, updateCategoryStatus],
  )

  useEffect(() => {
    setUseCategoryList(categoryList)
  }, [categoryList])

  return (
    <div className="w-[232px] h-[232px] relative m-auto">
      {useCategoryList.map(category => (
        <SpotButton
          key={category.name}
          id={category.id}
          name={category.name}
          status={category.status}
          isClickable={isCategoryClickable(category.status ?? 'default')}
          onClick={() => buttonClickHandler(category)}
        />
      ))}
      <Image src="/image/earth.svg" alt="Earth Image" width="233" height="233" />
    </div>
  )
}
