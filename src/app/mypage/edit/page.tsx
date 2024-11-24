'use client'
import UserProfile from '@/components/user/UserProfile'
import UserEditButton from '@/components/user/UserEditButton'
import Button from '@/components/common/Button'
import { useEffect, useState } from 'react'
import { getUserId, getUserInfo, updateUser } from '@/apis/user'

export default function MyPageEdit() {
  const [user, setUser] = useState({ user_id: '', nickname: '', avatar_url: '' })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedNickname, setEditedNickname] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await getUserId()
      if (!userId) return console.error('User ID not found')

      const userInfo = await getUserInfo(userId)
      if (userInfo) {
        setUser({
          user_id: userId,
          nickname: userInfo[0].nickname,
          avatar_url: userInfo[0].avatar_url,
        })
      }
    }
    fetchUserInfo()
  }, [])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 10) setEditedNickname(value)
    else alert('닉네임은 최대 10글자까지 가능합니다.')
  }

  const onClickPencil = () => {
    setIsEditMode(!isEditMode)
    setEditedNickname(user.nickname)
  }

  const onClickSubmitButton = () => {
    updateUser(user.user_id, 'nickname', editedNickname)
    setUser(prev => ({ ...prev, nickname: editedNickname }))
    setIsEditMode(!isEditMode)
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
          onChange={onChangeInput}
          placeholder="이름을 입력해주세요"
          maxLength={10}
          disabled={!isEditMode}
          className="w-[calc(100% - 25px)] placeholder:text-gray bg-inherit"
        />
        {isEditMode || <UserEditButton type="pencil" onClick={() => onClickPencil()} />}
      </form>
      {isEditMode && (
        <Button width={87} height={40} fontSize={16} onClick={onClickSubmitButton}>
          저장하기
        </Button>
      )}
    </main>
  )
}
