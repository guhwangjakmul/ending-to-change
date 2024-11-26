import { SpotButtonProps } from '@/types/CategoryField'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

  const clickHandler = () => {
    if (!isClickable) return

    setButtonStatus(prevStatus => {
      switch (prevStatus) {
        case 'default':
          return 'selected'
        case 'selected':
          return 'default'
        case 'completed':
          return prevStatus
        default:
          return prevStatus
      }
    })
  }

  const imageSrc = `/image/button/${buttonInfo[name].imgName}_${buttonStatus}.svg`

  useEffect(() => {
    setButtonStatus(status)
  }, [status])

  return (
    <button
      type="button"
      onClick={onClick || clickHandler}
      className={`absolute ${buttonInfo[name].classList} ${
        status === 'completed' || !isClickable ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <Image src={imageSrc} alt={name} width="46" height="65" />
    </button>
  )
}
