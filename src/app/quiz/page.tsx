'use client'
import Image from 'next/image'

import Question from '@/components/quiz/Question'
import Answer from '@/components/quiz/Answer'

import { Quiz } from '@/types/quiz'

export default function Page() {
  // 임시로 넣어뒀습니다.
  const quiz: Quiz = {
    id: 1,
    categoryId: 1,
    question: '대파, 쪽파 등 뿌리 채소에 흙이 묻어있는 경우 일반쓰레기로 버린다.',
    isAnswer: true,
    description:
      '더 이상 쓸 수 없는 파나 파껍질은 음식물 쓰레기지만, 밑단의 뿌리는 밑단을 잘라 일반 쓰레기로 버려야 합니다.',
  }

  return (
    <div className="relative h-full">
      <div className="absolute bottom-0">
        <Image src="/image/quiz-background.svg" alt="" width={390} height={217} />
      </div>
      <Question question={quiz.question} />
      <Answer isAnswer={quiz.isAnswer} description={quiz.description} />
    </div>
  )
}
