import { HeaderProps } from '@/types/Header'
import Image from 'next/image'
import RightButton from './RightButton'
import { useRouter } from 'next/navigation'

export default function Header(props: HeaderProps) {
  const router = useRouter()
  const {
    backOnClick = () => router.back(),
    title,
    useKebabMenuBtn = false,
    useReportBtn = false,
  } = props

  const useRightBtn = useKebabMenuBtn || useReportBtn

  return (
    <div className="w-full flex items-center px-[30px] pt-[20px]">
      <button className="w-1/5" onClick={backOnClick}>
        <Image
          src="/image/back-button.svg"
          alt="backBtn"
          width="9"
          height="15"
          style={{ width: 9, height: 15 }}
        />
      </button>
      <span className="w-3/5 text-center font-sindinaru-b text-brown">{title || ''}</span>
      {useRightBtn && <RightButton type={useKebabMenuBtn ? 'kebabMenuBtn' : 'reportBtn'} />}
    </div>
  )
}
