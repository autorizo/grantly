import { HamburguerIconProps } from './HamburguerIcon.types'

export const HamburguerIcon = ({ className }: HamburguerIconProps) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    className={className}
    fill='none'
  >
    <path
      d='M3 6.00092H21M3 12.0009H21M3 18.0009H21'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
