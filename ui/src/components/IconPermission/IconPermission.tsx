import { IconMap, IconPermissionProps } from './IconPermission.types'

export const IconPermission = ({image}: IconPermissionProps) => {
  const IconComponent = IconMap[image] || null

  return IconComponent && <IconComponent className='h-5 w-5' />
}
