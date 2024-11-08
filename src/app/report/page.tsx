'use client'
import Image from 'next/image'

import Header from '@/components/common/header/Header'
import Calendar from '@/components/Calendar'

export default function page() {
  return (
    <div className="relative h-screen font-gothic-b text-brown ">
      <Image src="/image/record_background.svg" alt="" fill objectFit="cover" />
      <div className="absolute w-full">
        <Header backOnClick={() => alert('onClick!')} title="탄소 기록함" />
        <Calendar />
        <div className="flex flex-col gap-[35px] w-100% h-100% py-12 px-5 bg-[#D3EDE8]">
          <div className="w-full h-[142px] bg-beige rounded-[15px]">오늘 걸은 거리</div>
          <div className="w-full h-[280px] bg-beige rounded-[15px]">통계</div>
        </div>
      </div>
    </div>
  )
}
