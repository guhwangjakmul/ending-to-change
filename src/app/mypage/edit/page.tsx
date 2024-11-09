'use client'
import UserProfile from '@/components/user/UserProfile'
import UserEditButton from '@/components/user/UserEditButton'
import Button from '@/components/common/Button'
import { useState } from 'react'

export default function MyPageEdit() {
  const [isEditMode, setIsEditMode] = useState(false)
  const userInfo = {
    nickName: 'gaori',
    profile: '/image/default_profile.svg',
  }
  const onClickPencil = () => {
    setIsEditMode(!isEditMode)
    alert('pencil')
  }
  return (
    <main className="w-full h-screen flex items-center flex-col pt-[90px]">
      <div className="w-[100px] h-[100px] relative">
        <UserProfile isEditable={true} size={100} />
      </div>
      <form
        action=""
        className="w-[230px] p-[10px] mt-[70px] mb-[20px] flex justify-between flex-wrap border-b-[2.5px] border-b-brown font-sindinaru-b text-brown"
      >
        <label htmlFor="nickname" className="w-full block mb-[5px]">
          이름
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder="이름을 입력해주세요"
          maxLength={10}
          className="w-[calc(100% - 25px)] placeholder:text-gray bg-inherit"
        />
        {isEditMode || <UserEditButton type="pencil" onClick={() => onClickPencil()} />}
      </form>
      {isEditMode && (
        <Button width={87} height={40} fontSize={16} onClick={() => alert('저장하기')}>
          저장하기
        </Button>
      )}
    </main>
  )
}
