interface ReportWrapperProps {
  children: React.ReactNode
  height?: number
}

export default function ReportWrapper(props: ReportWrapperProps) {
  const { children, height = 142 } = props

  return (
    <div className={`w-full mb-[39px] bg-beige rounded-[15px]`} style={{ height: `${height}px` }}>
      {children}
    </div>
  )
}
