interface ReportWrapperProps {
  children: React.ReactNode
  height?: number
  paddingX?: number
  isNoDistance?: boolean
}

export default function ReportWrapper(props: ReportWrapperProps) {
  const { children, height = 142, paddingX = 30, isNoDistance } = props

  return (
    <div
      className={`relative w-full mb-[39px] py-[30px]  bg-beige rounded-[15px] flex flex-col items-center justify-center`}
      style={{ height: `${height}px`, padding: `${paddingX}px` }}
    >
      {isNoDistance && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#7E725C] bg-opacity-60 rounded-[15px]  z-10">
          <span className="text-white text-center">아직 걷기 기록이 없어요!</span>
        </div>
      )}
      {children}
    </div>
  )
}
