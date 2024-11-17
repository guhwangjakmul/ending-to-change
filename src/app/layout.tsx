import type { Metadata } from 'next'
import '@/styles/globals.css'
import HeaderLayout from '@/components/layout/HeaderLayout'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper'

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
      <body suppressHydrationWarning={true} className="flex items-center justify-center">
        <div className="max-w-[390px] w-screen h-screen bg-light-beige relative  flex flex-col">
        <BackgroundWrapper>
          <HeaderLayout />
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  )
}
