import {
    CommentIcon,
    FinanceIcon,
    MailIcon,
    PhoneIcon,
    UserIcon,
    WhatsappIcon,
  } from 'components'

export const IconMap = {
    user: UserIcon,
    phone: PhoneIcon,
    comment: CommentIcon,
    envelope: MailIcon,
    finance: FinanceIcon,
    whatsapp: WhatsappIcon,
  }
  export type IconMapTypes = keyof typeof IconMap
  

export type IconPermissionProps = {
    image: IconMapTypes,
    size?: string,
    className?: string,
};
