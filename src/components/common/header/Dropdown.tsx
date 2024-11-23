'use client'

import { onClickLogout } from '@/utils/user/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Dropdown() {
  const router = useRouter()
  const [mouseEnter, setMouseEnter] = useState<number | null>(null)

  const listData = [
    {
      text: '랭킹',
      onClick: () => router.push('/ranking'),
    },
    {
      text: '회원정보 수정',
      onClick: () => router.push('/mypage/edit'),
    },
    {
      text: '로그아웃',
      onClick: () => {
        console.log('로그아웃!')
        onClickLogout()
      },
    },
  ]

  return (
    <ul className="w-[123px] h-[118px] py-[10px] bg-light-yellow rounded-[20px] text-[14px] text-medium-brown font-sindinaru-b text-left flex flex-col justify-around">
      {listData.map((el, index) => (
        <li
          key={el.text}
          onMouseEnter={() => setMouseEnter(index)}
          onClick={el.onClick}
          className="relative pl-[20px]"
        >
          <span
            className={`relative z-[2] inline-block ${
              mouseEnter === index
                ? 'before:absolute before:bottom-0 before:left-0 before:z-[-1] before:content-[""] before:w-full before:h-[8px] before:bg-yellow before:rounded-[8px]'
                : ''
            }`}
          >
            {el.text}
          </span>
          {mouseEnter === index && (
            <Image
              className="absolute left-[-5px] top-0"
              src="/image/drop-down-hover-mouse-icon.svg"
              alt="mouseIcon"
              width="19"
              height="19"
              style={{ width: 19, height: 19 }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
