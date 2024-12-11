'use client'
import UserProfile from '@/components/user/UserProfile'
import UserEditButton from '@/components/user/UserEditButton'
import Button from '@/components/common/Button'
import { useFetchUserInfo } from '@/app/hook/useFetchUserInfo'
import { useState } from 'react'
import { updateUser } from '@/apis/user'

export default function MyPageEdit() {
  const { user } = useFetchUserInfo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedNickname, setEditedNickname] = useState(user.nickname)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedNickname(e.target.value)

  const handleSubmit = async () => {
    if (editedNickname.trim() === '') return alert('닉네임을 입력해주세요.')

    try {
      await updateUser(user.user_id, 'nickname', editedNickname)
      user.nickname = editedNickname
      setIsEditMode(false)
    } catch (error) {
      console.error('닉네임 업데이트 실패:', error)
      alert('닉네임 업데이트 중 문제가 발생했습니다.')
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleEditMode = () => {
    setIsEditMode(true)
    setEditedNickname(user.nickname)
  }

  return (
    <main className="w-full h-[calc(100% - 44px)] flex items-center flex-col pt-[90px]">
      <div className="w-[100px] h-[100px] relative">
        <UserProfile size={100} imgSrc={user.avatar_url} />
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
          value={isEditMode ? editedNickname : user.nickname}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="이름을 입력해주세요"
          maxLength={10}
          disabled={!isEditMode}
          className="w-[calc(100% - 25px)] placeholder:text-gray bg-inherit"
        />
        {!isEditMode && <UserEditButton type="pencil" onClick={handleEditMode} />}
      </form>
      {isEditMode && (
        <Button width={87} height={40} fontSize={16} onClick={handleSubmit}>
          저장하기
        </Button>
      )}
    </main>
  )
}
