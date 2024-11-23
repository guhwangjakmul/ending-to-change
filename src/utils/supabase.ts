import { Database } from '@/types/supabase'
import { createServerClient } from '@supabase/ssr'
import { getCookie, setCookie } from 'cookies-next'
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

// [3] middleware
export const createServerSideMiddleware = async (req: NextRequest, res: NextResponse) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => getCookie(key, { req, res }),
        set: (key: string, value: string, options: any) => {
          setCookie(key, value, { req, res, ...options })
        },
        remove: (key: string, options: any) => {
          setCookie(key, '', { req, res, ...options })
        },
      },
    },
  )
}
