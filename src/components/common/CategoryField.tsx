'use client'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import SpotButton from './SpotButton'
import { CategoryFieldProps } from '@/types/CategoryField'
import { useEffect, useState, useCallback } from 'react'

export default function CategoryField(props: CategoryFieldProps) {
  const { categoryList, isClickable = false, onClick, setSelectCategory } = props
  const pathname = usePathname()
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

  const buttonClickHandler = useCallback(
    (category: { name: string; status: string }) => {
      const { name, status } = category

      if (setSelectCategory && status !== 'completed') setSelectCategory(name)
      if (!isCategoryClickable(status)) return
      if (pathname === '/mypage' && status === 'completed') alert(`${name}으로 이동`)
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
          name={category.name}
          status={category.status}
          isClickable={isCategoryClickable(category.status)}
          onClick={() => buttonClickHandler(category)}
        />
      ))}
      <Image src="/image/earth.svg" alt="Earth Image" width="233" height="233" />
    </div>
  )
}
