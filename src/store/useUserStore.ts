import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  userId: string | null
  categoryId: number | null
  setUserId: (id: string) => void
  setCategoryId: (id: number) => void
  clearUser: () => void
}

const zustandLocalStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name)
    return value ? JSON.parse(value) : null
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name)
  },
}

const useUserStore = create(
  persist<UserState>(
    set => ({
      userId: null,
      categoryId: null,
      setUserId: id => set({ userId: id }),
      setCategoryId: id => set({ categoryId: id }),
      clearUser: () => set({ userId: null, categoryId: null }),
    }),
    {
      name: 'user-store', // 로컬 스토리지 키
      storage: zustandLocalStorage, // Custom storage wrapper
    },
  ),
)

export default useUserStore
