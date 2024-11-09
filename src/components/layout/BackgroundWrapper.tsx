'use client'

import { usePathname } from 'next/navigation'

interface BackgroundWrapperProps {
  children: React.ReactNode
}

export default function BackgroundWrapper(props: BackgroundWrapperProps) {
  const { children } = props

  const pathname = usePathname()
  const whiteBackground = ['/', '/walk', '/ranking', '/report']

  return (
    <div
      className={`max-w-[390px] w-screen h-screen relative ${
        whiteBackground.includes(pathname) ? '' : 'bg-light-beige'
      }`}
    >
      {children}
    </div>
  )
}
