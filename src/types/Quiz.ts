import { Database } from '@/types/supabase'

export type QuizDto = Database['public']['Tables']['quiz']['Row']
