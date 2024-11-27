import { create } from 'zustand'

interface UserState {
  userId: string | null
  categoryId: number | null
  setUserId: (id: string) => void
  setCategoryId: (id: number) => void
  clearUser: () => void
}

const useUserStore = create<UserState>(set => ({
  userId: null,
  categoryId: null,
  setUserId: id => set({ userId: id }),
  setCategoryId: id => set({ categoryId: id }),
  clearUser: () => set({ userId: null, categoryId: null }),
}))

export default useUserStore
