import { getCategoryIdByName, getCategoryNameById } from '@/apis/category'

// GET
export const getLocalStorage = (target: string) => localStorage.getItem(target)

// SET
export const setLocalStorage = (target: string, data: any) => {
  localStorage.setItem(target, JSON.stringify(data))
}

// SET: 카테고리 정보 로컬스토리지에 담기(category, viewResultCategory)
export const setLocalStorageCategory = async (
  saveName: string,
  existed: 'id' | 'name',
  data: number | string,
) => {
  setLocalStorage(saveName, {
    id: (existed === 'id' ? data : await getCategoryIdByName(data as string)) as number,
    name: (existed === 'id' ? await getCategoryNameById(data as number) : data) as string,
  })
}

// REMOVE
export const removeLocalStorage = (target: string) => {
  localStorage.removeItem(target)
}
