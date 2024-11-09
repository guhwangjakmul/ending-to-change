interface ReportWrapperProps {
  children: React.ReactNode
  height?: number
  paddingX?: number
}

export default function ReportWrapper(props: ReportWrapperProps) {
  const { children, height = 142, paddingX = 30 } = props

  return (
    <div
      className={`w-full mb-[39px] py-[30px]  bg-beige rounded-[15px] flex flex-col items-center`}
      style={{ height: `${height}px`, padding: `${paddingX}px` }}
    >
      {children}
    </div>
  )
}
