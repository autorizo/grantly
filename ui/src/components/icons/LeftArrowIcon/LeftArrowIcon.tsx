import { LeftArrowIconProps } from './LeftArrowIcon.types'
import classNames from 'classnames'

export const LeftArrowIcon = ({ className, size }: LeftArrowIconProps) => {
  const iconClass = classNames(className, {
    'h-5 w-5': size === 'sm',
    'h-9 w-9': size === 'md',
    'h-12 w-12': size === 'lg',
  })

  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      width='1em'
      height='1em'
      className={iconClass}
    >
      <path
        xmlns='http://www.w3.org/2000/svg'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M20 8h-9m9 4H4m0 0 3-3m-3 3 3 3m13 1h-9'
      />
    </svg>
  )
}
