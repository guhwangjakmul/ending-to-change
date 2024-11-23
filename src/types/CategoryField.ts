export type CategoryName =
  | '대기오염'
  | '에너지 절약'
  | '분리수거'
  | '토양오염'
  | '지구온난화'
  | '수질오염'
type CategoryStatus = 'default' | 'selected' | 'completed'
type isClickable = boolean

export interface Category {
  name: CategoryName
  status?: CategoryStatus
}

export interface SpotButtonProps extends Category {
  isClickable?: isClickable
  onClick: () => void
}

export interface CategoryFieldProps {
  categoryList: Category[]
  isClickable?: isClickable
  onClick?: () => void
}
