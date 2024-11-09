import Image from 'next/image'

interface UserEditButtonProps {
  type: 'camera' | 'pencil'
  onClick: () => void
}

export default function UserEditButton(props: UserEditButtonProps) {
  const { type, onClick } = props
  const info = {
    camera: {
      alt: '프로필 이미지 변경',
      size: 24,
      classList: 'absolute bottom-[5px] right-[5px]',
    },
    pencil: {
      alt: '닉네임 수정',
      size: 19,
      classList: '',
    },
  }[type]

  return (
    <button className={`w-[25px] h-[25px] ${info.classList}`} onClick={onClick}>
      <Image
        src={`/image/${type}.svg`}
        alt={info.alt}
        width={info.size}
        height={info.size}
        className="m-auto"
        style={{ width: info.size, height: info.size }}
      />
    </button>
  )
}
