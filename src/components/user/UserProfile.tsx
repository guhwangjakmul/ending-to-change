import Image from 'next/image'
import UserEditButton from './UserEditButton'

interface UserProfileProps {
  size: number
  isEditable?: boolean
  imgSrc?: string
}

export default function UserProfile(props: UserProfileProps) {
  const { size, isEditable = false, imgSrc } = props
  return (
    <>
      <Image
        src={imgSrc || '/image/default_profile.svg'}
        alt=""
        width={size}
        height={size}
        className="rounded-full"
      />
      {isEditable && <UserEditButton type="camera" onClick={() => alert('camera')} />}
    </>
  )
}
