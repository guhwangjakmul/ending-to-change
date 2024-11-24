import type { Metadata } from 'next'
import '@/styles/globals.css'
import HeaderLayout from '@/components/layout/HeaderLayout'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '구해줘요 동물의숲',
  description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        />
      </head>
      <body suppressHydrationWarning={true} className="flex items-center justify-center">
        <div className="max-w-[390px] w-screen h-screen bg-light-beige relative  flex flex-col">
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
