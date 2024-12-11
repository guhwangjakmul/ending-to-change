import { NextRequest, NextResponse } from 'next/server'
import { createServerSideMiddleware } from './utils/supabase'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = await createServerSideMiddleware(request, response)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const url = request.nextUrl
  const isAuthPath = url.pathname.startsWith('/auth')
  const isAllClearPath = url.pathname.startsWith('/category/')

  // 로그인 여부와 상관없이 올클 페이지(/category/[uuid]) 접근 허용
  if (isAllClearPath) return response

  // 비로그인 유저 처리
  if (!session && !isAuthPath) {
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  // 로그인 유저 처리
  if (session && isAuthPath) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // 다른 요청은 그대로 통과
  return response
}

export const config = {
  matcher: ['/', '/auth/:path*', '/category/:path*', '/mypage/:path*', '/quiz/:path*'],
}
