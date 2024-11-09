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
        className="w-[390px] h-screen bg-black opacity-25 z-100000 absolute top-0 left-0 flex justify-center items-center"
        onClick={onClick}
      ></div>

      <div
        style={{ height: `${height}px` }}
        className="w-[313px] rounded-[30px] bg-light-beige flex justify-center items-center flex-col z-1000001 absolute top-[50%] translate-y-[-50%]"
      >
        {children}
      </div>
    </>
  )
}
