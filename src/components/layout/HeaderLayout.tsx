'use client'

import { usePathname } from 'next/navigation'
import Header from '../common/header/Header'

type HeaderType = 'onlyBackBtn' | 'noneRightBtn' | 'useKebabMenuBtn' | null

interface RouteInfo {
  path: string
  title: string
}

interface HeaderTypeRouter {
  onlyBackBtn: string[]
  noneRightBtn: RouteInfo[]
  useKebabMenuBtn: RouteInfo[]
}

// Header Type에 따른 url 정보
const headerTypeRouter: HeaderTypeRouter = {
  onlyBackBtn: ['/ranking', '/quiz'],
  noneRightBtn: [
    {
      path: '/mypage/edit',
      title: '회원정보 수정',
    },
  ],
  useKebabMenuBtn: [
    {
      path: '/mypage',
      title: '마이홈',
    },
  ],
}

const getHeaderInfo = (path: string): { key: HeaderType; title?: string } => {
  for (const key in headerTypeRouter) {
    const routes = headerTypeRouter[key as keyof HeaderTypeRouter]

    // < 버튼만 사용하는 경우
    if (key === 'onlyBackBtn') {
      if (headerTypeRouter.onlyBackBtn.includes(path)) {
        return { key: 'onlyBackBtn' }
      }
    }
    // < 버튼과 제목만 사용하는 경우 / 케밥 메뉴 버튼까지 사용하는 경우
    else {
      const foundRoute = (routes as RouteInfo[]).find(route => route.path === path)
      if (foundRoute) {
        return { key: key as HeaderType, title: foundRoute.title }
      }
    }
  }
  return { key: null } // 해당 경로가 어떤 키에도 속하지 않는 경우: Header 컴포넌트 렌더링x
}

export default function HeaderLayout() {
  const pathname = usePathname()
  const { key: headerType, title } = getHeaderInfo(pathname)

  // HeaderType에 따라 Header 컴포넌트 렌더링
  return (
    <>
      {headerType === 'onlyBackBtn' && <Header />}
      {headerType === 'noneRightBtn' && <Header title={title} />}
      {headerType === 'useKebabMenuBtn' && <Header title={title} useKebabMenuBtn />}
    </>
  )
}
