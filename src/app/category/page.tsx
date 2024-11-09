'use client'
import Button from '@/components/common/Button'
import CategoryField from '@/components/common/CategoryField'

export default function ChooseCategory() {
  const focusCategory = '지구온난화'
  return (
    <main className="w-full h-screen text-center py-[57px] flex flex-col justify-center items-center">
      <div className="font-sindinaru-m">
        <h1 className="text-[15px] text-brown mb-[20px]">회복하고 싶은 캐릭터를 골라주세요</h1>
        <span className="block w-[121px] h-[40px] leading-[40px] rounded-[15px] m-auto bg-white border-none text-dark-brown">
          {focusCategory}
        </span>
      </div>
      <CategoryField />
      <Button
        width={303}
        height={40}
        fontSize={20}
        color="text-medium-brown"
        backgroundColor="bg-yellow"
        onClick={() => alert('다음!')}
      >
        다음
      </Button>
    </main>
  )
}
