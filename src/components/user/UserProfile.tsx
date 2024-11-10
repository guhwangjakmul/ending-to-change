import Image from 'next/image'
import UserEditButton from './UserEditButton'

interface UserProfileProps {
  size: number
  isEditable?: boolean
  imgSrc?: string
}

export default function UserProfile(props: UserProfileProps) {
  const { size, isEditable = false, imgSrc = '/image/default_profile.svg' } = props
  return (
    <>
      <Image src={imgSrc} alt="" width={size} height={size} />
      {isEditable && <UserEditButton type="camera" onClick={() => alert('camera')} />}
    </>
  )
}
