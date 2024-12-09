'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import Question from '@/components/quiz/Question'
import Answer from '@/components/quiz/Answer'
import Message from '@/components/quiz/Message'

import { QuizDto } from '@/types/Quiz'
import { getUnsolvedQuizzes } from '@/apis/quiz'
import useUserStore from '@/store/useUserStore'
import Loading from '../loading'

export default function Page() {
  const [quizList, setQuizList] = useState<QuizDto[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가
  const [categoryName, setCategoryName] = useState<string | null>(null) // categoryName 상태 추가

  const { userId, categoryId } = useUserStore()

  useEffect(() => {
    // localStorage에서 categoryName 가져오기
    const storedCategory = localStorage.getItem('category')
    if (storedCategory) {
      try {
        const parsedCategory = JSON.parse(storedCategory)
        setCategoryName(parsedCategory.name || '카테고리') // name 속성이 없으면 기본값 설정
      } catch (error) {
        console.error('localStorage에서 카테고리 이름 가져오는 중 에러 발생', error)
        setCategoryName('카테고리')
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (!userId) throw new Error('User ID가 없습니다.')
        if (!categoryId) throw new Error('Category ID가 없습니다.') // null 처리

        const data = await getUnsolvedQuizzes(userId, categoryId)
        if (data.length > 0) {
          setQuizList(data)
          setCurrentQuizIndex(0)
        }
      } catch (error) {
        console.error('풀지 않은 퀴즈 데이터를 가져오는 중 에러 발생', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId, categoryId])

  const currentQuiz = quizList[currentQuizIndex]

  if (isLoading) return <Loading />

  return (
    <div className="relative h-screen">
      {currentQuiz ? (
        <>
          <div className="relative z-10">
            <Question question={currentQuiz.question} />
            <Answer currentQuiz={currentQuiz} />
          </div>
        </>
      ) : (
        <Message message={`${categoryName}에 있는 모든 퀴즈를 풀었습니다!`} />
      )}
      <div className="absolute bottom-0">
        <Image
          src="/image/quiz-background.svg"
          alt=""
          width={390}
          height={217}
          layout="responsive"
        />
      </div>
    </div>
  )
}
