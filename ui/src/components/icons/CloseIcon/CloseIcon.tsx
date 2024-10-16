import { CloseIconProps } from './CloseIcon.types'

export const CloseIcon = ({ className }: CloseIconProps) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <circle cx='12' cy='12' r='10' stroke='currentColor' />
    <path
      d='M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5'
      stroke='currentColor'
    />
  </svg>
)
