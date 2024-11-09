'use client'

interface ModalProps {
  children: React.ReactNode
  height: number
  onClick?: () => void // 모달 닫기 함수
}

export default function Modal(props: ModalProps) {
  const { children, height, onClick } = props

  return (
    <>
      <div
        className="fixed w-[390px] h-screen bg-black opacity-25 z-50 top-0 left-1/2 transform -translate-x-1/2"
        onClick={onClick}
      ></div>

      <div
        style={{ height: `${height}px` }}
        className="fixed w-[313px] 
        rounded-[30px] 
        bg-light-beige 
        flex 
        justify-center 
        items-center 
        flex-col 
        z-50 
        top-1/2 
        left-1/2 
        transform 
        -translate-x-1/2 
        -translate-y-1/2  
"
      >
        {children}
      </div>
    </>
  )
}
