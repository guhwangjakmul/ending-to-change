import React from 'react'
import Button from '@/components/common/Button'
import Image from 'next/image'
import ProgressBar from '@/components/common/ProgressBar'

interface FooterButtonsProps {
  currentProgress: number
  level: number
  handleUsePotion: () => void
  count: number
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
  currentProgress,
  level,
  handleUsePotion,
  count,
}) => {
  return (
    <section className="absolute bottom-8 space-y-5">
      <div className="flex justify-end">
        <Button
          width={76}
          height={28}
          fontSize={14}
          backgroundColor="bg-light-yellow"
          color="text-medium-brown"
          isLink
          href="/mypage"
          isBoxShadow
          isMediumFont
        >
          <div className="flex space-x-1">
            <Image src="/image/myhome_icon.svg" alt="" width={18} height={18} />
            <p>마이홈</p>
          </div>
        </Button>
      </div>

      <ProgressBar currentProgress={currentProgress} level={level} />

      <div className="flex gap-2 leading-[normal]">
        <Button
          width={123}
          height={56}
          fontSize={14}
          backgroundColor="bg-beige"
          color="text-brown"
          isLink
          href="/quiz"
          isBoxShadow
        >
          <div className="flex items-center px-[12px] py-[9px] space-x-2 text-left ">
            <Image src="/image/quiz_icon.svg" alt="" width={38} height={38} />
            <p>퀴즈로 물약얻기</p>
          </div>
        </Button>
        <Button
          width={123}
          height={56}
          fontSize={14}
          backgroundColor="bg-beige"
          color="text-brown"
          isLink
          href="/walk"
          isBoxShadow
        >
          <div className="flex items-center px-[12px] py-[9px] space-x-2 text-left">
            <Image src="/image/walk_icon.svg" alt="" width={38} height={38} />
            <p>걷기로 물약얻기</p>
          </div>
        </Button>
        <Button
          width={56}
          height={56}
          fontSize={12}
          backgroundColor="bg-mint-green"
          color="text-light-mint"
          onClick={handleUsePotion}
          isBoxShadow
        >
          <div className="flex flex-col">
            <Image src="/image/reward.svg" alt="" width={28} height={28} />
            <p>{count}개</p>
          </div>
        </Button>
      </div>
    </section>
  )
}

export default FooterButtons
