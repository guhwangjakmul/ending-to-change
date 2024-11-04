import { CategoryName } from '@/types/CategoryField'
import { CharacterText } from '@/types/TextField'
import Image from 'next/image'

export default function CharacterText(props: CharacterText) {
  const { charName, content, charTextColor, charBackgroundColor } = props

  const customStyle = {
    color: `${charTextColor}`,
    background: `${charBackgroundColor}`,
  }

  return (
    <div className="relative w-[330px] animate-scale-in-center top-10">
      {/* 이미지 사용 */}
      <div>
        <div className=" flex items-center justify-center relative">
          <Image src="/image/char_bubble.svg" alt="" width={330} height={100} className="" />
          <p className="w-[250px] break-keep cursor-default text-[16px] font-gothic-b text-brown  absolute timeline-description">
            {content}
          </p>
        </div>

        <div
          style={customStyle}
          className="flex items-center justify-center rounded-[20px] text-[11px] px-[15px] w-fit h-[22px] font-sindinaru-m absolute top-[-10px] left-[15px] -rotate-6"
        >
          {charName}
        </div>
      </div>

      {/* div 사용 (모양 구현 X, 대신 크기가 텍스트 따라감) */}
      <div className="relative top-10">
        <div className="w-[330px] min-h-[100px] h-fit px-[30px] py-[20px] bg-beige break-keep cursor-default text-[16px] font-gothic-b text-brown rounded-[100px] timeline-description">
          {content}
        </div>
        <div
          style={customStyle}
          className="flex items-center justify-center rounded-[20px] text-[11px] px-[15px] w-fit h-[22px] font-sindinaru-m absolute top-[-10px] left-[15px] -rotate-6"
        >
          {charName}
        </div>
      </div>
    </div>
  )
}
