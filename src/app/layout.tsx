// import type { Metadata } from 'next'
// import '@/styles/globals.css'
// import HeaderLayout from '@/components/layout/HeaderLayout'
// import BackgroundWrapper from '@/components/layout/BackgroundWrapper'
// import Script from 'next/script'
// import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
//   keywords: ['구해줘요', '동물의 숲', '주민 구출'],
//   openGraph: {
//     title: '구해줘요 동물의 숲',
//     description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
//     url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}`,
//     siteName: '구해줘요 동물의 숲',
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/thumbnail.png`,
//         width: 800,
//         height: 600,
//       },
//       {
//         url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/thumbnail.png`,
//         width: 1800,
//         height: 1600,
//       },
//     ],
//     locale: 'ko',
//     type: 'website',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const router = useRouter() // 현재 경로 가져오기
//   const titleMap: Record<string, string> = {
//     '/': '메인',
//     '/auth': '로그인',
//     '/category': '카테고리',
//     '/category/': '올클리어',
//     '/mypage': '마이홈',
//     '/mypage/edit': '회원정보 수정',
//     '/quiz': '퀴즈',
//     '/report': '통계',
//     '/walk': '걷기',
//   }
//   const pageTitle = `구해줘요 동물의 숲 | ${titleMap[router.pathname] || '구해줘요 동물의 숲'}`

//   return (
//     <html lang="ko">
//       <head>
//         <title>{pageTitle}</title>
//         <Script
//           type="text/javascript"
//           src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
//         />
//       </head>
//       <body suppressHydrationWarning={true} className="flex items-center justify-center">
//         <div className="max-w-[390px] w-screen h-screen bg-light-beige relative  flex flex-col">
//           <BackgroundWrapper>
//             <HeaderLayout />
//             {children}
//           </BackgroundWrapper>
//         </div>
//         <div id="portal"></div>
//       </body>
//     </html>
//   )
// }
import type { Metadata } from 'next'
import '@/styles/globals.css'
import HeaderLayout from '@/components/layout/HeaderLayout'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper'
import Script from 'next/script'
import DynamicTitle from '@/components/common/DynamicTitle'

export const metadata: Metadata = {
  description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
  keywords: ['구해줘요', '동물의 숲', '주민 구출'],
  openGraph: {
    title: '구해줘요 동물의 숲',
    description: '환경을 살려 위험에 처한 주민들을 구해주세요!',
    url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}`,
    siteName: '구해줘요 동물의 숲',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/system/thumbnail.png`,
        width: 800,
        height: 600,
      },
      {
        url: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/system/thumbnail.png`,
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'ko',
    type: 'website',
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/system/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/system/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/image/system/favicon.png`,
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
