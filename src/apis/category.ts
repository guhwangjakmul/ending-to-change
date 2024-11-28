import { createSupabaseBrowserClient } from '@/utils/client/supabase'
import { Database } from '@/types/supabase'

type CategoryInfo = Database['public']['Tables']['category_progress']['Row']

const supabase = createSupabaseBrowserClient()

/**
 *
 * @param id 유저의 uuid
 * @returns category_progress 테이블에서 해당 유저의 데이터 리스트
 */
export const getCategoryProgress = async (id: string) => {
  const { data, error } = await supabase.from('category_progress').select('*').eq('user_id', id)
  if (error) {
    console.error('데이터 패칭 실패', error)
    return []
  }
  return data
}

export const changeComplete = async (id: string, categoryId: number) => {
  const { data, error } = await supabase
    .from('category_progress')
    .update({ is_completed: true })
    .eq('user_id', id)
    .eq('category_id', categoryId)
  if (error) {
    console.error('데이터 패칭 실패', error)
    return []
  }
  return data
}

/**
 * 전체 카테고리 데이터 리스트를 반환하는 함수
 * @returns 전체 카테고리 데이터 리스트
 */
export const getAllCategoryList = async () => {
  const { data, error } = await supabase.from('category').select('*')
  if (error) {
    console.error('데이터 패칭 실패', error)
    return []
  }
  return data
}

/**
 * 카테고리 아이디에 해당하는 카테고리명을 반환하는 함수
 * @param idList 카테고리 id 배열
 */
export const getCategoryList = async (idList: number[]) => {
  const { data, error } = await supabase.from('category').select('*').in('id', idList)
  if (error) {
    console.error('데이터 패칭 실패', error)
    return []
  }
  return data
}

/**
 * 유저가 성공한 카테고리 리스트를 반환하는 함수
 * @param id 유저 uuid
 * @returns 성공한 카테고리 리스트
 */
export const getCompletedCategoryList = async (id: string) => {
  const userCategoryList = getCategoryProgress(id)
  const completedCategoryList = (await userCategoryList).filter(data => data.is_completed)
  const completedCategoryIdList = completedCategoryList.map(data => data.category_id)

  const categoryList = await getCategoryList(completedCategoryIdList)

  return categoryList
}

// category_progress 가져오기
export const getCategoryProgressUjin = async (user_id: string): Promise<CategoryInfo | null> => {
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

  const currentProgress = await getCategoryProgressUjin(user_id)
  const currentPoints = currentProgress?.progress ?? 0

  await supabase
    .from('category_progress')
    .update({ progress: currentPoints + points })
    .eq('user_id', user_id)
}

/**
 * 카테고리 이름으로 ID 반환
 * @param name 카테고리 이름
 * @returns 해당 카테고리 ID
 */
export const getCategoryIdByName = async (name: string) => {
  const { data, error } = await supabase.from('category').select('id').eq('name', name)

  if (error) return console.error('카테고리 ID 조회 실패:', error.message)
  return data[0].id
}
/**
 * 새로운 카테고리 진행 데이터 생성
 * @param userId 유저 UUID
 * @param name 카테고리 이름
 */
export const createCategoryProgress = async (user_id: string, name: string) => {
  const category_id = await getCategoryIdByName(name)
  if (!category_id) return

  const { error } = await supabase.from('category_progress').insert({
    user_id,
    category_id,
    progress: 0,
    is_completed: false,
  })

  if (error) return console.error('카테고리 진행 생성 실패:', error.message)
  console.log('카테고리 진행 생성 성공')
}

/**
 * 특정 유저의 `category_progress` 테이블에서 모든 카테고리 진행 상태(`is_completed`) 조회
 * @param {string} user_id - 진행 상태를 조회할 유저의 UUID.
 * @returns {Promise<Array<{ is_completed: boolean }> | null>}
 * 각 카테고리 진행 상태(`is_completed`)를 포함한 객체 배열 반환
 */
export const getCategoryProgressIsCompleted = async (user_id: string) => {
  const supabase = createSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('category_progress')
    .select('is_completed')
    .eq('user_id', user_id)
  console.log('data', data)
  if (error) console.error('error: ', error.message)
  return data
}
