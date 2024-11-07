import Image from 'next/image'

interface SocialButtonProps {
  type: 'google' | 'kakao' | 'naver'
  onClick: () => void
}

export default function SocialButton(props: SocialButtonProps) {
  const { type, onClick } = props

  const socialAlt = {
    google: '구글 로그인',
    kakao: '카카오 로그인',
    naver: '네이버 로그인',
  }[type]

  return (
    <button type="button" onClick={onClick}>
      <Image src={`/image/button/${type}.svg`} alt={socialAlt} width="60" height="60" />
    </button>
  )
}
