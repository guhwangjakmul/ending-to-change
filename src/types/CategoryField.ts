export type CategoryName = 'air' | 'energy' | 'recycle' | 'soil' | 'warming' | 'water'
type CategoryStatus = 'default' | 'selected' | 'completed'
type isClickable = boolean

export interface Category {
  name: CategoryName
  status: CategoryStatus
}

export interface SpotButtonProps extends Category {
  onClick: () => void
}

export interface CategoryFieldProps {
  isClickable?: isClickable
}
