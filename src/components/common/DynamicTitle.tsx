'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function DynamicTitle() {
  const pathname = usePathname() // 현재 경로 가져오기

  const titleMap: Record<string, string> = {
    '/': '메인',
    '/auth': '로그인',
    '/category': '카테고리',
    '/category/': '올클리어',
    '/mypage': '마이홈',
    '/mypage/edit': '회원정보 수정',
    '/quiz': '퀴즈',
    '/report': '통계',
    '/walk': '걷기',
  }

  const defaultTitle = '구해줘요 동물의 숲'
  const pageTitle = `${defaultTitle} | ${titleMap[pathname] || defaultTitle}`

  useEffect(() => {
    document.title = pageTitle // 브라우저 타이틀 동적 변경
  }, [pathname, pageTitle])

  return null // 렌더링하지 않음
}
