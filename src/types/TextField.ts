export interface Text {
  yaho?: string
  children: React.ReactNode
}

export type RewardTextProps = Text & {
  handleRewardTextClick?: () => void
}

export interface CharacterText {
  charName: string
  content: string
  charTextColor: string
  charBackgroundColor: string
}
