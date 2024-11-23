import { CharacterText } from '@/types/TextField'
import Image from 'next/image'

export default function CharacterBubble(props: CharacterText) {
  const { charName, content, charTextColor, charBackgroundColor } = props

  const customStyle = {
    color: `${charTextColor}`,
    background: `${charBackgroundColor}`,
  }

  return (
    <div className="relative w-[330px] animate-scale-in-center top-10">
      <div className="flex flex-col items-center">
        <div className="absolute w-[330px] h-[80px] bg-beige rounded-full"></div>
        <div className="absolute top-14 w-[300px] h-[50px] bg-beige rounded-full"></div>
        <p className="absolute w-[330px] px-[35px] py-[17px] text-brown cursor-default break-keep font-gothic-b text-[16px] whitespace-pre-line">
          {content}
        </p>
        <Image
          src="/image/yellow_triangle.svg"
          alt=""
          width={15}
          height={7}
          className="absolute top-[100px]"
        />
      </div>

      {/* 주민 이름표 */}
      <div
        style={customStyle}
        className="flex items-center justify-center rounded-[20px] text-[11px] px-[15px] w-fit h-[22px] font-sindinaru-m absolute top-[-13px] left-[15px] -rotate-6"
      >
        {charName}
      </div>
    </div>
  )
}
