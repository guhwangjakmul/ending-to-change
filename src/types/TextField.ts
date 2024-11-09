export interface Text {
  yaho?: string
  children: React.ReactNode
}

export type RewardTextProps = Text & {
  onScaleOutStart?: () => void
}
