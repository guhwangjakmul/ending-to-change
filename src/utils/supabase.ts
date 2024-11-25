import { Database } from '@/types/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// [1] server action + router handler
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: (key: string, value: string, options: any) => {
          if (serverComponent) return
          cookieStore.set(key, value, options)
        },
        remove: (key: string, options: any) => {
          if (serverComponent) return
          cookieStore.set(key, '', options)
        },
      },
    },
  )
}

// [2] server action + RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true)
}

const parseCookies = (cookieHeader: string | null) => {
  const cookies: Record<string, string> = {}
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [key, ...value] = cookie.split('=')
      cookies[key.trim()] = decodeURIComponent(value.join('='))
    })
  }
  return cookies
}

const serializeCookie = (name: string, value: string, options: any = {}) => {
  const opts = { path: '/', ...options }
  const cookieParts = [`${name}=${encodeURIComponent(value)}`]
  if (opts.maxAge) cookieParts.push(`Max-Age=${opts.maxAge}`)
  if (opts.domain) cookieParts.push(`Domain=${opts.domain}`)
  if (opts.path) cookieParts.push(`Path=${opts.path}`)
  if (opts.secure) cookieParts.push('Secure')
  if (opts.httpOnly) cookieParts.push('HttpOnly')
  if (opts.sameSite) cookieParts.push(`SameSite=${opts.sameSite}`)
  return cookieParts.join('; ')
}

// [3] middleware
export const createServerSideMiddleware = async (req: NextRequest, res: NextResponse) => {
  const cookies = parseCookies(req.headers.get('cookie'))

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookies[key] || null,
        set: (key: string, value: string, options: any) => {
          const serializedCookie = serializeCookie(key, value, options)
          res.headers.append('Set-Cookie', serializedCookie)
        },
        remove: (key: string, options: any) => {
          const serializedCookie = serializeCookie(key, '', { ...options, maxAge: 0 })
          res.headers.append('Set-Cookie', serializedCookie)
        },
      },
    },
  )
}
