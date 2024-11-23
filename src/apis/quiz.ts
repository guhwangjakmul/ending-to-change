"use client";


import { createSupabaseBrowserClient } from "@/utils/client/supabase";
import { getUserInfo, updateUser } from "@/utils/user/user";


// 특정 사용자가 풀지 않은 퀴즈 가져오기
export const getUnsolvedQuizzes = async (user_id: string, category_id: number) => {
  const supabase = createSupabaseBrowserClient();

  const { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select("*")
    .eq("category_id", category_id); 

  if (quizError) {
    console.error("Error fetching quiz data from Supabase:", quizError.message);
    return [];
  }

  const { data: quizLogs, error: quizLogError } = await supabase
    .from("quiz_log")
    .select("*")
    .eq("user_id", user_id); 

  if (quizLogError) {
    console.error("Error fetching quiz_log data from Supabase:", quizLogError.message);
    return [];
  }

  const solvedQuizIds = quizLogs?.map((quizLog) => quizLog.quiz_id) || [];
  const unSolvedQuizzes = quizData?.filter((quiz) => !solvedQuizIds.includes(quiz.id)) || [];

  return unSolvedQuizzes;
};

// 사용자 point 업데이트
export const updateUserPoint = async (user_id: string, point: number) => {
  try {
    const userInfo = await getUserInfo(user_id);

    if (!userInfo || userInfo.length === 0) {
      console.error("User not found.");
      return;
    }

    const currentPoint = userInfo[0].point ?? 0; 
    const newPoint = currentPoint + point;

    if (isNaN(newPoint)) {
      throw new Error("New points cannot be NaN. Check input values.");
    }

    const isUpdated = await updateUser(user_id, "point", newPoint);

    if (!isUpdated) {
      console.error("Failed to update user points.");
      return;
    }

  } catch (error) {
    console.error("Error in updateUserPoint:", error);
  }
}

// 퀴즈 로그 저장
export const insertQuizLog = async (quiz_id: number, user_id: string) => {
  const supabase = createSupabaseBrowserClient();

  await supabase
    .from("quiz_log")
    .insert({quiz_id, user_id})
}