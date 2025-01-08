import { IconMap, IconPermissionProps } from './IconPermission.types'
import classNames from 'classnames'

export const IconPermission = ({ image, size = 'sm' }: IconPermissionProps) => {
  const IconComponent = IconMap[image] || null

  const className = classNames({
    'h-5 w-5': size === 'sm',
    'h-6 w-6': size === 'md',
    'h-8 w-8': size === 'lg',
  })

  return IconComponent && <IconComponent className={className} />
}
