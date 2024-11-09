import Image from 'next/image'

export default function SocialButtonList() {
  const onClickGoogle = () => alert('구글 로그인')
  const onClickKakao = () => alert('카카오 로그인')
  const onClickNaver = () => alert('네이버 로그인')

  return (
    <ul className="w-[258px] flex justify-between">
      <li>
        <button type="button" onClick={onClickGoogle}>
          <Image src="/image/button/google.svg" alt="구글 로그인" width="60" height="60" />
        </button>
      </li>
      <li>
        <button type="button" onClick={onClickKakao}>
          <Image src="/image/button/kakao.svg" alt="카카오 로그인" width="60" height="60" />
        </button>
      </li>
      <li>
        <button type="button" onClick={onClickNaver}>
          <Image src="/image/button/naver.svg" alt="네이버 로그인" width="60" height="60" />
        </button>
      </li>
    </ul>
  )
}
