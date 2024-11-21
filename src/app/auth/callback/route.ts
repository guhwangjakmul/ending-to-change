import { createServerSideClient } from '@/utils/supabase'
import { NextResponse } from 'next/server'

/**
 * 로그인 후 리디렉션을 처리하는 API 핸들러
 * 소셜 로그인 인증 코드(code)를 처리하고, 인증 코드가 있으면 세션 교환 후 리디렉션 수행
 * @param {Request} request - 클라이언트로부터 전달된 HTTP dycjd rorcp
 * @returns {NextResponse} - 리디렉션 응답 객체
 */
export async function GET(request: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')
  if (code) {
    const supabase = await createServerSideClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(`${overrideOrigin}${next}`)
    return NextResponse.redirect(`${overrideOrigin}`)
  }
  return NextResponse.redirect(`${overrideOrigin}${next}`)
}
