export interface SpotButtonProps {
  category: 'air' | 'energy' | 'recycle' | 'soil' | 'warming' | 'water'
  status: 'default' | 'selected' | 'completed'
  isClickable?: boolean
}
