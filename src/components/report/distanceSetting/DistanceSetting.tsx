import { useEffect, useState } from 'react'

import Modal from '@/components/common/Modal'
import RangeSlider from './RangeSlider'
import Button from '@/components/common/Button'

import useModal from '@/app/hook/useModal'

interface DistanceSettingProps {
  goalKm: number
  updateGoalKm: (value: number) => void
}

export default function DistanceSetting(props: DistanceSettingProps) {
  const { goalKm, updateGoalKm } = props
  const [isOpen, openModal, closeModal, portalElement] = useModal()
  const [temporaryGoal, setTemporaryGoal] = useState(goalKm)

  useEffect(() => {
    if (isOpen) {
      setTemporaryGoal(goalKm)
    }
  }, [isOpen, goalKm])

  const handleGoalChange = () => {
    updateGoalKm(temporaryGoal)
    closeModal()
  }

  return (
    <div className="flex justify-end mt-[18px] mb-[10px] pr-2">
      <span
        onClick={openModal}
        className="font-gosindinaru-m text-xs text-light-gray border-b border-light-gray cursor-pointer"
      >
        거리 설정
      </span>
      {portalElement && isOpen && (
        <Modal height={273} onClick={closeModal}>
          <span className="mb-[19px]">하루 목표를 설정해주세요!</span>
          <div className="bg-white w-[100px] h-[30px] rounded-[10px] mb-[30px] flex justify-center items-center font-sindinaru-m text-dark-brown text-[14px]">
            {temporaryGoal}km
          </div>
          <RangeSlider
            currentProgress={temporaryGoal}
            onChange={setTemporaryGoal}
            isOpen={isOpen}
          />
          <Button width={100} height={40} fontSize={12} onClick={handleGoalChange}>
            결정
          </Button>
        </Modal>
      )}
    </div>
  )
}
