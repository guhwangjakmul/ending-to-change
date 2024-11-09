'use client'
import { useState } from 'react'

import Modal from '../common/Modal'
import Button from '../common/Button'
import AnswerButton from './AnswerButton'

import useModal from '@/app/hook/useModal'

interface AnswerProps {
  isAnswer: boolean
  description: string
}

export default function Answer(props: AnswerProps) {
  const { isAnswer, description } = props
  const [isOpen, openModal, closeModal, portalElement] = useModal()
  const [modalMessage, setModalMessage] = useState<string>('')

  const handleAnswerClick = (value: boolean) => {
    if (value === isAnswer) {
      setModalMessage('정답이에요!')
    } else {
      setModalMessage('정답이 아니에요')
    }
    openModal()
  }

  return (
    <div className="flex justify-center gap-[50px]">
      <AnswerButton value="정답" onClick={() => handleAnswerClick(true)} />
      <AnswerButton x value="정답 아님" onClick={() => handleAnswerClick(false)} />
      {portalElement && isOpen && (
        <Modal height={338} onClick={closeModal}>
          <div className="flex flex-col gap-[30px] items-center py-[30px] px-[38px] font-gothic-m">
            <span className=" text-mint-green">{modalMessage}</span>
            <span className="min-h-[168px] text-brown">{description}</span>
            <Button width={60} height={30} fontSize={14} onClick={closeModal}>
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
