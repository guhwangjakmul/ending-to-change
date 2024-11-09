'use client'

interface AnswerButtonProps {
  x?: boolean
  value: string
  onClick: (value: string) => void
}

export default function AnswerButton(props: AnswerButtonProps) {
  const { x, value, onClick } = props

  return (
    <button
      onClick={() => onClick(value)}
      className="
        inline-flex 
        flex-col 
        items-center 
        justify-center 
        w-[100px] 
        h-[100px] 
        bg-[#CEC6BA] 
        hover:bg-yellow 
        active:bg-yellow
        rounded-[20px] 
        font-sindinaru-m 
        text-[15px] 
        text-[#928E83]
        hover:text-medium-brown
        active:text-medium-brown
        cursor-pointer
        "
    >
      <span>{x ? 'X' : 'O'}</span>
      <span>{x ? '아니다' : '맞다'}</span>
    </button>
  )
}
