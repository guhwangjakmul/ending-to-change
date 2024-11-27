'use client'
import { useState } from 'react'

import Modal from '../common/Modal'
import Button from '../common/Button'
import AnswerButton from './AnswerButton'
import Reward from '../common/Reward'

import useModal from '@/app/hook/useModal'

import { QuizDto } from '@/types/Quiz'
import { updateUserPoint, insertQuizLog } from '@/apis/quiz'
import { updateProgress } from '@/apis/category'
import useUserStore from '@/store/useUserStore'

interface AnswerProps {
  currentQuiz: QuizDto
}

export default function Answer(props: AnswerProps) {
  const { currentQuiz } = props
  const [isOpen, openModal, closeModal, portalElement] = useModal()
  const [modalMessage, setModalMessage] = useState<string>('')
  const [isShowReward, setIsShowReward] = useState(false)
  const [rewardContent, setRewardContent] = useState<React.ReactNode>(null)
  const [yaho, setYaho] = useState<string>()
  const { userId } = useUserStore()

  const handleCloseReward = () => {
    setIsShowReward(false)
  }

  const handleModalClick = () => {
    closeModal()

    setIsShowReward(true)
  }

  const handleAnswerClick = async (value: boolean) => {
    // 임시 테스트용 -> 변경 예정
    if (!userId) throw new Error('User ID not found')

    const isCorrect = value === currentQuiz.is_answer
    const points = isCorrect ? 2 : 1

    await updateUserPoint(userId, points)
    await insertQuizLog(currentQuiz.id, userId)
    await updateProgress(userId, points)

    if (isCorrect) {
      setModalMessage('정답이에요!')
      setRewardContent(
        <span>
          퀴즈를 맞춰서 <span className="text-mint-green">치료약 2개</span>를 획득했다!
        </span>,
      )
    } else {
      setModalMessage('정답이 아니에요')
      setRewardContent(
        <span>
          퀴즈는 틀렸지만 <span className="text-mint-green">치료약 1개</span>를 획득했다!
        </span>,
      )
      setYaho('앗, 아쉬워~')
    }
    openModal()
  }

  return (
    <div className="flex justify-center gap-[50px]">
      <AnswerButton value="true" onClick={() => handleAnswerClick(true)} />
      <AnswerButton x value="false" onClick={() => handleAnswerClick(false)} />
      {portalElement && isOpen && (
        <Modal height={338} onClick={closeModal}>
          <div className="flex flex-col gap-[30px] items-center py-[30px] px-[38px] font-gothic-m">
            <span className=" text-mint-green">{modalMessage}</span>
            <span className="min-h-[168px] text-brown">{currentQuiz.description}</span>
            <Button width={60} height={30} fontSize={14} onClick={handleModalClick}>
              확인
            </Button>
          </div>
        </Modal>
      )}
      {isShowReward && (
        <Reward onClose={handleCloseReward} yaho={yaho} rewardContent={rewardContent} />
      )}
    </div>
  )
}
