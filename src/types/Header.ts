interface BaseHeaderProps {
  backOnClick?: React.MouseEventHandler
  title?: string
}

interface KebabMenuBtn extends BaseHeaderProps {
  useKebabMenuBtn?: boolean
  useReportBtn?: false
}

interface ReportBtn extends BaseHeaderProps {
  useReportBtn?: boolean
  useKebabMenuBtn?: false
}

export type HeaderProps = KebabMenuBtn | ReportBtn
