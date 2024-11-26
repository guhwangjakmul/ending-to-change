'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'
import { getAllCategoryList } from '@/apis/category'
import { Category, CategoryName } from '@/types/CategoryField'
import Loading from '../loading'
import { useRouter } from 'next/navigation'

export default function ChooseCategory() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [selectCategory, setSelectCategory] = useState<CategoryName>(
    null as unknown as CategoryName,
  )
  const router = useRouter()

  const clickHandler = () => {
    localStorage.setItem('category', selectCategory)
    router.push('/')
  }

  useEffect(() => {
    ;(async () => {
      const allCategoryList = await getAllCategoryList()
      const formattedCategoryList: Category[] = allCategoryList.map(data => ({
        name: data.name as CategoryName,
        status: 'default',
      }))
      setCategoryList(formattedCategoryList)
    })()
  }, [])

  return categoryList.length ? (
    <main className="w-full h-screen text-center py-[57px] flex flex-col justify-center items-center">
      <div className="font-sindinaru-m">
        <h1 className="text-[15px] text-brown mb-[20px]">회복하고 싶은 캐릭터를 골라주세요</h1>
        <span className="block w-[121px] h-[40px] leading-[40px] rounded-[15px] m-auto bg-white border-none text-dark-brown">
          {selectCategory}
        </span>
      </div>
      <CategoryField
        categoryList={categoryList}
        isClickable
        setSelectCategory={setSelectCategory}
      />
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
    </main>
  ) : (
    <Loading />
  )
}
