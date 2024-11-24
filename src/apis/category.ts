'use client'

import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { Database } from '@/types/supabase'

type CategoryInfo = Database['public']['Tables']['category_progress']['Row']

const supabase = createSupabaseBrowserClient()

// category_progress 가져오기
export const getCategoryProgress = async (user_id: string): Promise<CategoryInfo | null> => {
  const { data } = await supabase
    .from('category_progress')
    .select('*')
    .eq('user_id', user_id)
    .limit(1)
    .single()

  return data
}

// category_progress의 progress 업데이트
export const updateProgress = async (user_id: string, points: number) => {
  const supabase = createSupabaseBrowserClient()

  const currentProgress = await getCategoryProgress(user_id)
  const currentPoints = currentProgress?.progress ?? 0

  await supabase
    .from('category_progress')
    .update({ progress: currentPoints + points })
    .eq('user_id', user_id)
}
