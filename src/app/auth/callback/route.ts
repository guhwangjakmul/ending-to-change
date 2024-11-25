import { createUser } from '@/apis/user'
import { createServerSideClient } from '@/utils/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (!code) return NextResponse.redirect(`${overrideOrigin}${next}`)

  const supabase = await createServerSideClient()

  // 인증 코드로 세션 교환
  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
  if (sessionError) {
    console.error('Session exchange failed:', sessionError)
    return NextResponse.redirect(`${overrideOrigin}${next}`)
  }

  // 현재 인증된 유저 정보 가져오기
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) throw userError

    // user 테이블에서 유저 정보 확인
    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (checkError) throw checkError

    // 유저 정보가 없는 경우 새로 생성하고 카테고리 페이지로 이동
    if (!existingUser) {
      await createUser({
        id: user.id,
        email: user.email!,
        avatar_url: user.user_metadata?.avatar_url,
      })
      return NextResponse.redirect(`${overrideOrigin}/category`)
    }
  } catch (err) {
    console.error('Failed to handle user data:', err)
  }

  return NextResponse.redirect(`${overrideOrigin}`)
}
