export type LabelType = 'Lv' | 'Km'
export type ProgressColor = 'bg-mint-green' | 'bg-lime-green' | 'bg-yellow'
export type BackgroundColor = 'bg-white' | 'bg-[#d9d9d9]'

export interface ProgressBarProps {
  labelType?: LabelType
  currentProgress: number
  level?: number
  showLabel?: boolean
  maxKm?: number
}
