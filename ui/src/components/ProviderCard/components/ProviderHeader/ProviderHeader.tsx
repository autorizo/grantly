import { StarIcon } from 'components'
import { ProviderHeaderProps } from './ProviderHeader.types'

export const ProviderHeader = ({
  name,
  total,
  description,
}: ProviderHeaderProps) => (
  <div className='flex flex-col gap-2'>
    <div className='flex gap-4 items-center justify-between'>
      <div className='flex items-center gap-2'>
        <img
          src={`/images/${name}.png`}
          alt={name}
          className='rounded-full w-10 h-10 object-scale-down'
        />
        <h2 className='text-xl font-semibold'>{name}</h2>
      </div>
      <div className='flex items-center gap-2 border-primary border-2 px-1.5 py-0.5 rounded-full'>
        <StarIcon className='h-6 w-6 text-yellow-500' />
        <p className='text-xs'>
          {total}
          <span className='hidden sm:contents'> Puntos</span>
        </p>
      </div>
    </div>
    <p className='text-sm sm:text-md text-gray-700'>{description}</p>
  </div>
)
