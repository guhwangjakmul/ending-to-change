import { SpotButtonProps } from '@/types/CategoryField'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

const buttonInfo = {
  대기오염: {
    imgName: 'air',
    classList: 'bottom-[60px] right-[1px]',
  },
  '에너지 절약': {
    imgName: 'energy',
    classList: 'top-[23px] right-[21px]',
  },
  분리수거: {
    imgName: 'recycle',
    classList: 'top-[2px] left-[2px]',
  },
  토양오염: {
    imgName: 'soil',
    classList: 'top-[77px] left-[61px]',
  },
  지구온난화: {
    imgName: 'warming',
    classList: '-top-[38px] left-[84px]',
  },
  수질오염: {
    imgName: 'water',
    classList: 'bottom-[37px] left-[19px]',
  },
}

export default function SpotButton(props: SpotButtonProps) {
  const { name, status = 'default', onClick, isClickable = false } = props
  const [buttonStatus, setButtonStatus] = useState(status)

  // 클릭 가능 여부 확인 후 버튼 상태 변경
  const handleButtonClick = useCallback(() => {
    if (!isClickable) return

    setButtonStatus(prevStatus => {
      if (prevStatus === 'default') return 'selected'
      if (prevStatus === 'selected') return 'default'
      return prevStatus
    })
  }, [isClickable])

  useEffect(() => {
    setButtonStatus(status)
  }, [status])

  const imageSrc = `/image/button/${buttonInfo[name]?.imgName}_${buttonStatus}.svg`
  const buttonClass = `absolute ${buttonInfo[name]?.classList} ${
    isClickable ? 'cursor-pointer' : 'cursor-default'
  }`

  return (
    <button type="button" onClick={onClick || handleButtonClick} className={buttonClass}>
      <Image src={imageSrc} alt={name} width={46} height={65} />
    </button>
  )
}
