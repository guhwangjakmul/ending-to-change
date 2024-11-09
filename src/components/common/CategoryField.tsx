'use client'
import Image from 'next/image'
import SpotButton from './SpotButton'
import { useState } from 'react'
import { Category, CategoryName, CategoryFieldProps } from '@/types/CategoryField'

// FIXME: 데이터베이스 구축 시 들어올 데이터
const initialCategoryList: Category[] = [
  { name: 'air', status: 'completed' },
  { name: 'energy', status: 'completed' },
  { name: 'recycle', status: 'completed' },
  { name: 'soil', status: 'default' },
  { name: 'warming', status: 'selected' },
  { name: 'water', status: 'default' },
]

export default function CategoryField(props: CategoryFieldProps) {
  const { isClickable = true } = props
  const [categoryList, setCategoryList] = useState(initialCategoryList)

  const onClickButton = (name: CategoryName) => {
    if (!isClickable) return

    setCategoryList(prevList => {
      const clickedCategory = prevList.find(category => category.name === name)

      if (clickedCategory?.status === 'completed') return prevList

      return prevList.map(category => {
        if (category.name === name)
          return {
            ...category,
            status: category.status === 'default' ? 'selected' : 'default',
          }
        else if (category.status !== 'completed') return { ...category, status: 'default' }
        return category
      })
    })
  }

  return (
    <div className="w-[232px] h-[232px] relative m-auto">
      {categoryList.map(category => (
        <SpotButton
          key={category.name}
          name={category.name}
          status={category.status}
          isClickable={isClickable}
          onClick={() => onClickButton(category.name)}
        />
      ))}
      <Image src="/image/earth.svg" alt="" width="233" height="233" />
    </div>
  )
}
