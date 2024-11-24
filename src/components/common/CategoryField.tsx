'use client'
import Image from 'next/image'
import SpotButton from './SpotButton'
import { CategoryFieldProps } from '@/types/CategoryField'

export default function CategoryField(props: CategoryFieldProps) {
  const { categoryList, isClickable = false, onClick } = props

  const buttonClickHandler = () => {
    if (!isClickable) return
    if (onClick) return onClick
  }

  return (
    <div className="w-[232px] h-[232px] relative m-auto">
      {categoryList &&
        categoryList.map(category => (
          <SpotButton
            key={category.name}
            name={category.name}
            status={category.status}
            isClickable={isClickable}
            onClick={buttonClickHandler}
          />
        ))}
      <Image src="/image/earth.svg" alt="" width="233" height="233" />
    </div>
  )
}
