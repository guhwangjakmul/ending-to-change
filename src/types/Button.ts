interface BaseButtonProps {
  children: React.ReactNode
  width: number
  height: number
  fontSize: number
  color?: string
  backgroundColor?: string
  isBoxShadow?: boolean
  isMediumFont?: boolean
}

interface LinkButtonProps extends BaseButtonProps {
  isLink: true
  href: string
  onClick?: React.MouseEventHandler
}

interface NonLinkButtonProps extends BaseButtonProps {
  isLink?: false
  href?: undefined
  onClick: React.MouseEventHandler
}

export type ButtonProps = LinkButtonProps | NonLinkButtonProps
