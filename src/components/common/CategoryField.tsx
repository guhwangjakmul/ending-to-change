'use client'
import Image from 'next/image'
import SpotButton from './SpotButton'
import { CategoryFieldProps, CategoryName } from '@/types/CategoryField'
import { useEffect, useState } from 'react'

export default function CategoryField(props: CategoryFieldProps) {
  const { categoryList, isClickable = false, onClick, setSelectCategory } = props

  const [useCategoryList, setUseCategoryList] = useState(categoryList)

  const buttonClickHandler = (name: CategoryName) => {
    if (setSelectCategory) {
      setSelectCategory(name)
    }

    if (!isClickable) return
    setUseCategoryList(prevList => {
      const clickedCategory = prevList.find(category => category.name === name)

      if (clickedCategory?.status === 'completed') return prevList

      return prevList.map(category => {
        if (category.name === name)
          return {
            ...category,
            status: category.status === 'default' ? 'selected' : 'selected',
          }
        else if (category.status !== 'completed') return { ...category, status: 'default' }
        return category
      })
    })
  }

  useEffect(() => {
    setUseCategoryList(categoryList)
  }, [categoryList])

  return (
    <div className="w-[232px] h-[232px] relative m-auto">
      {useCategoryList &&
        useCategoryList.map(category => (
          <SpotButton
            key={category.name}
            name={category.name}
            status={category.status}
            isClickable={isClickable}
            onClick={() => buttonClickHandler(category.name)}
          />
        ))}
      <Image src="/image/earth.svg" alt="" width="233" height="233" />
    </div>
  )
}
