import Image from 'next/image'
import CategoryField from '@/components/common/CategoryField'
import UserProfile from '@/components/UserContainer/UserProfile'

export default function MyPage() {
  const userInfo = {
    nickName: '가오리영감탱구리임다',
    categoryCount: 1,
    profile: '' || '/image/default_profile.svg',
  }
  return (
    <main className="w-full h-screen flex items-center flex-col p-[35px]">
      <div className="w-full flex items-center gap-[15px]">
        <UserProfile size={50} isEditable={false} />
        <span className="font-gothic-m text-brown text-[12px] whitespace-nowrap">
          {userInfo.nickName}님, 현재 뱃지 {userInfo.categoryCount}개를 획득했어요
        </span>
      </div>
      <CategoryField isClickable={false} />
    </main>
  )
}
