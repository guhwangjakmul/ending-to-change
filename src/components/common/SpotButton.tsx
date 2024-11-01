import { SpotButtonProps } from '@/types/CategoryField'
import Image from 'next/image'

const buttonInfo = {
  air: {
    classList: 'bottom-[60px] right-[1px]',
    alt: '대기 오염',
  },
  energy: {
    classList: 'top-[23px] right-[21px]',
    alt: '에너지 절약',
  },
  recycle: {
    classList: 'top-[2px] left-[2px]',
    alt: '분리수거',
  },
  soil: {
    classList: 'top-[77px] left-[61px]',
    alt: '토양 오염',
  },
  warming: {
    classList: '-top-[38px] left-[84px]',
    alt: '지구온난화',
  },
  water: {
    classList: 'bottom-[37px] left-[19px]',
    alt: '수질 오염',
  },
}

export default function SpotButton(props: SpotButtonProps) {
  const { name, status, onClick, isClickable = true } = props

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute ${buttonInfo[name].classList} ${
        status === 'completed' || !isClickable ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <Image
        src={`/image/button/${name}_${status}.svg`}
        alt={buttonInfo[name].alt}
        width="46"
        height="65"
      />
    </button>
  )
}
