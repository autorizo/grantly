import { ButtonProps } from './Button.types'

export const Button = ({ children, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className='bg-primary text-white max-h-full p-2 rounded-lg text-sm'
  >
    {children}
  </button>
)
