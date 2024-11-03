'use client'
import Image from 'next/image'
import Button from '@/components/common/Button'

export default function NotFound() {
  return (
    <main className="w-full h-screen bg-light-beige flex justify-center items-center flex-col gap-[20px] text-center">
      <Image src="/image/system/404.svg" alt="" width="121" height="121" />
      <h1 className="font-gothic-b text-[20px] text-dark-brown">페이지를 찾을 수 없습니다</h1>
      <p className="font-gothic-m text-[12px] text-gray">
        페이지가 삭제되었거나 주소가 잘못되었습니다
        <br />
        주소가 정확한지 다시 한 번 확인해주세요
      </p>
      <Button width={100} height={40} fontSize={16} isLink href="/">
        메인으로
      </Button>
    </main>
  )
}
