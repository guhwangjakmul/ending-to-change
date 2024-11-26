import type { Metadata } from 'next'
import '@/styles/globals.css'
import HeaderLayout from '@/components/layout/HeaderLayout'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper'
import Script from 'next/script'
import DynamicTitle from '@/components/common/DynamicTitle'
const url =
  process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME ||
  process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME_LOCAL
export const metadata: Metadata = {
  description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
  keywords: ['구해줘요', '동물의 숲', '주민 구출'],
  openGraph: {
    title: '구해줘요 동물의 숲',
    description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
    url: `${url}`,
    siteName: '구해줘요 동물의 숲',
    images: [
      {
        url: `${url}/image/system/thumbnail.png`,
        width: 800,
        height: 600,
      },
      {
        url: `${url}/image/system/thumbnail.png`,
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'ko',
    type: 'website',
  },
  icons: {
    icon: `${url}/image/system/favicon.ico`,
    shortcut: `${url}/image/system/favicon.ico`,
    apple: `${url}/image/system/favicon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <DynamicTitle /> {/* 동적 타이틀 설정 */}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        />
      </head>
      <body suppressHydrationWarning={true} className="flex items-center justify-center">
        <div className="max-w-[390px] w-screen h-screen bg-light-beige relative flex flex-col">
          <BackgroundWrapper>
            <HeaderLayout />
            {children}
          </BackgroundWrapper>
        </div>
        <div id="portal"></div>
      </body>
    </html>
  )
}
