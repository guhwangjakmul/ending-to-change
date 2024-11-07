'use client'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'
import UserProfile from '@/components/UserContainer/UserProfile'
import Image from 'next/image'

export default function AllClear() {
  const username = '가오리영감탱구리임다'

  return (
    <main className="w-full h-screen py-[70px] flex flex-col justify-center items-center">
      <UserProfile size={100} />
      <div className="text-center mt-[30px]">
        <h1 className="text-sky-blue text-[20px] font-gothic-b mb-[4px]">
          {username}님, 축하합니다!
        </h1>
        <span className="text-brown text-[16px] font-gothic-m">
          지구가 다시 살아났어요! <br />
          지구의 결말을 바꾼 멋진 주인공이 되었네요
        </span>
      </div>
      <CategoryField isClickable={false} />
      <Button width={114} height={41} fontSize={16} onClick={() => alert('공유하기!')}>
        <Image src="/image/share.svg" alt="" width="21" height="17" className="mr-[5px]" />
        공유하기
      </Button>
    </main>
  )
}
