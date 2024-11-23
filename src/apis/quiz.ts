"use client";

import { createSupabaseBrowserClient } from "@/utils/client/supabase";

/**
 * [GET] 특정 사용자가 풀지 않은 퀴즈 가져오기
 * @param userId 사용자 ID
 * @param categoryId 카테고리 ID (옵션)
 * @returns {Promise<any[]>} 풀지 않은 퀴즈 배열
 */
export const getUnsolvedQuizzes = async (userId: string, categoryId: number) => {
  const supabase = createSupabaseBrowserClient();

  // 1. quiz 데이터 가져오기
  const { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select("*")
    .eq("category_id", categoryId); // 특정 카테고리 필터링

  if (quizError) {
    console.error("Error fetching quiz data from Supabase:", quizError.message);
    return [];
  }

  // 2. quiz_log 데이터 가져오기
  const { data: quizLogs, error: quizLogError } = await supabase
    .from("quiz_log")
    .select("*")
    .eq("user_id", userId); // 사용자가 푼 퀴즈만 필터링

  if (quizLogError) {
    console.error("Error fetching quiz_log data from Supabase:", quizLogError.message);
    return [];
  }

  // 3. 사용자가 푼 퀴즈 ID 목록 생성
  const solvedQuizIds = quizLogs?.map((quizLog) => quizLog.quiz_id) || [];

  // 4. 사용자가 풀지 않은 퀴즈 필터링
  const unSolvedQuizzes = quizData?.filter((quiz) => !solvedQuizIds.includes(quiz.id)) || [];

  return unSolvedQuizzes;
};