import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('es')

export const formatDate = (date: string) => {
  const targetDate = dayjs(date)

  return targetDate.fromNow()
}
