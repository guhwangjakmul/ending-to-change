'use client'

import type { ButtonProps } from '@/types/Button'
import Link from 'next/link'

export default function Button(props: ButtonProps) {
  const {
    children,
    width,
    height,
    fontSize,
    onClick,
    isLink = false,
    href = '',
    color = 'text-white',
    backgroundColor = 'bg-mint-green',
    isBoxShadow = false,
    isMediumFont = false,
  } = props

  const shadowClass = isBoxShadow ? 'shadow-button' : ''
  const fontClass = isMediumFont ? 'font-sindinaru-m' : 'font-sindinaru-b'

  // 최종 클래스 문자열 생성
  const tailwindStyle = `rounded-[15px] flex items-center justify-center cursor-pointer ${color} ${backgroundColor} ${shadowClass} ${fontClass}`

  const customStyle = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${fontSize}px`,
  }

  return isLink && href ? (
    <Link href={href} onClick={onClick}>
      <button style={customStyle} className={tailwindStyle}>
        {children}
      </button>
    </Link>
  ) : (
    <button onClick={onClick} style={customStyle} className={tailwindStyle}>
      {children}
    </button>
  )
}
