import { ProfileIcon } from 'components'
import { BannerProps } from './Banner.types'

export const Banner = ({ totalPoints }: BannerProps) => (
  <div className='flex bg-primary justify-between p-8 pb-8 mb-2'>
    <div>
      <h1 className='text-sm sm:text-sm text-white'>Bienvenido a</h1>
      <h2 className='text-md sm:text-2xl font-bold text-white'>Autorizo</h2>
      <p className='text-sm sm:text-md text-white'>
        Tienes un total de {totalPoints} puntos
      </p>
    </div>
    <div className='flex justify-center items-center'>
      <div className='flex items-center justify-center gap-1 focus:outline-none rounded-full transition-colors bg-white p-2 '>
        <ProfileIcon className='w-7 h-7 text-primary' /> <span>Perfil</span>
      </div>
    </div>
  </div>
)
