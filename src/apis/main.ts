import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { Database } from '@/types/supabase'

const supabase = createSupabaseBrowserClient()

export const getPotion = async (user_id: string) => {
  const { data, error } = await supabase
    .from('user')
    .select('point')
    .eq('user_id', user_id)
    .single()

  if (error) {
    console.error('데이터 패칭 실패', error)
    return null
  }
  return data?.point
}

// point 감소 후 데이터베이스에 업데이트
export const decreasePotion = async (user_id: string, newPotion: number) => {
  const { data, error } = await supabase
    .from('user')
    .update({ point: newPotion }) // 감소한 potion 값을 업데이트
    .eq('user_id', user_id)

  if (error) {
    console.error('Potion 업데이트 실패:', error)
    return false
  }

  return true
}
