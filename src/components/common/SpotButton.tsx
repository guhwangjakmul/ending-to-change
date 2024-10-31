import { SpotButtonProps } from '@/types/CategoryField'
import Image from 'next/image'

const classList = {
  air: 'bottom-[60px] right-[1px]',
  energy: 'top-[23px] right-[21px]',
  recycle: 'top-[2px] left-[2px]',
  soil: 'top-[77px] left-[61px]',
  warming: '-top-[38px] left-[84px]',
  water: 'bottom-[37px] left-[19px]',
}

export default function SpotButton(props: SpotButtonProps) {
  const { name, status, onClick } = props

  return (
    <button type="button" onClick={onClick} className={`absolute ${classList[name]}`}>
      <Image src={`/image/button/${name}_${status}.svg`} alt={name} width="46" height="65" />
    </button>
  )
}
