import { CheckIconProps } from './CheckIcon.types'

export const CheckIcon = ({ className }: CheckIconProps) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 16 16'
    fill='currentColor'
    className={className}
  >
    <path
      id='Path_146'
      data-name='Path 146'
      d='M28,0a8,8,0,1,0,8,8A8.009,8.009,0,0,0,28,0Zm0,15a7,7,0,1,1,7-7A7.008,7.008,0,0,1,28,15Zm4.854-9.146-6,6a.5.5,0,0,1-.708,0l-3-3a.5.5,0,0,1,.708-.708L26.5,10.793l5.646-5.647a.5.5,0,0,1,.708.708Z'
      transform='translate(-20)'
    />
  </svg>
)
