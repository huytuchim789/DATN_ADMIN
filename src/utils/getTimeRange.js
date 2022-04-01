import { format } from 'date-fns'
import intervalToDuration from 'date-fns/intervalToDuration'
import milliseconds from 'date-fns/milliseconds'

export const getTimeRangeMilliseconds = (expiredDate) => {
  const timeInterval = intervalToDuration({
    start: Date.now(),
    end: new Date(expiredDate),
  })
  return milliseconds(timeInterval)
}
