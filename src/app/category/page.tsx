'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'
import { getAllCategoryList } from '@/apis/category'
import { Category, CategoryName } from '@/types/CategoryField'
import Loading from '../loading'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/useUserStore'

export default function ChooseCategory() {
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [selectCategory, setSelectCategory] = useState<CategoryName>(
    null as unknown as CategoryName,
  )
  const router = useRouter()
  // Zustand 상태 업데이트 함수 가져오기
  const { setUserId, setCategoryId } = useUserStore()

  const clickHandler = () => {
    // categoryList에서 선택된 카테고리를 찾습니다.
    const selectedCategory = categoryList.find(category => category.name === selectCategory)

    if (selectedCategory) {
      // 선택된 카테고리의 id를 Zustand에 저장
      setCategoryId(selectedCategory.id) // categoryId 저장
      console.log('Stored categoryId in Zustand:', selectedCategory.id)
    } else {
      console.warn('No category found for the selected name:', selectCategory)
    }

    // category name을 localStorage에 저장
    localStorage.setItem('category', selectCategory) // 선택한 카테고리 이름 저장

    // 페이지 이동
    router.push('/')
  }

  // user_id 저장 및 카테고리 리스트 가져오기
  useEffect(() => {
    // URL에서 user_id를 가져와 상태에 저장
    const query = new URLSearchParams(window.location.search)
    const userId = query.get('user_id')
    if (userId) {
      setUserId(userId) // Zustand에 user_id 저장
      console.log('Zustand store에 userId 저장:', userId)
    } else {
      console.log('No user_id found in URL.')
    }

    ;(async () => {
      const allCategoryList = await getAllCategoryList()
      const formattedCategoryList: Category[] = allCategoryList.map((data, index) => ({
        id: data.id || index, // categoryId가 없으면 index 사용
        name: data.name as CategoryName,
        status: 'default',
      }))
      setCategoryList(formattedCategoryList)
    })()
  }, [setUserId])

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
