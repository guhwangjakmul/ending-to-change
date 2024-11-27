import { useEffect, useState } from 'react'
import { useFetchUserInfo } from './useFetchUserInfo'
import { getAllCategoryList } from '@/apis/category'
import { Category } from '@/types/CategoryField'

export const useUpdatedCategoryList = () => {
  const { categoryList: completedCategoryList } = useFetchUserInfo()
  const [categoryListWithStatus, setCategoryListWithStatus] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        setIsLoading(true)
        const allCategoryList = await getAllCategoryList()
        const updatedCategoryList = allCategoryList.map(data => {
          const isCompleted = completedCategoryList.some(completed => completed.name === data.name)
          return {
            name: data.name,
            status: isCompleted ? 'completed' : 'default',
          }
        })
        setCategoryListWithStatus(updatedCategoryList)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategoryList()
  }, [completedCategoryList])

  return { categoryListWithStatus, isLoading, error }
}
