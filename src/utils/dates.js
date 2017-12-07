//@flow
import moment from 'moment'
import type Moment from 'moment'

const dayOfWeek = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    7: 'sun'
}

export const newDate = (point: ?string|Date) => (moment(point))

export const newDateWithOffset = (offSet: number|string) => (moment().utc().utcOffset(offSet))

export const now = (utcOffSet: ?number|string) => {
    if(utcOffSet) return newDateWithOffset(utcOffSet)
    return newDate()
}

export const clone = (date: Moment) => (date.clone())

export const parseDate = (value: Date, {dateFormat, locale}) => {
    const parsedDate = moment(value, dateFormat, locale || moment.locale(), true)
    return parsedDate.isValid() ? parsedDate : null
}

export const isMoment = (date: Moment|Date) => (moment.isMoment(date))

export const isDate = (date: Moment|Date) => (moment.isDate(date))

export const formatDate = (date: Moment, format: string) => (date.format(format))

export const safeDateFormat = (date: Moment, {dateFormat, locale}) => (date && clone(date)
    .locale(locale || moment.locale()))
    .format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || ''

export const setTime = (date: Moment, {hour, minute, second}) => date.set({hour, minute, second})

export const setMonth = (date: Moment, month: number) => date.set({month})

export const setYear = (date: Moment, year: number) => date.set({year})

export const setUtcOffSet = (date: Moment, offset: number) => date.utcOffset(offset)

export const getSeconds = (date: Moment) => date.get('second')

export const getMinutes = (date: Moment) => date.get('minute')

export const getHours = (date: Moment) => date.get('hour')

export const getDay = (date: Moment) => date.get('day')

export const getWeek = (date: Moment) => date.get('week')

export const getMonth = (date: Moment) => date.get('month')

export const getDayOfWeekCode = (date: Moment) => dayOfWeek[date.isoWeekday]

export const getStartOfDay = (date: Moment) => date.startOf('day')

export const getStartOfWeek = (date: Moment) => date.startOf('week')

export const getStartOfMonth = (date: Moment) => date.startOf('month')

export const getStartOfDate = (date: Moment) => date.startOf('date')

export const getEndOfWeek = (date: Moment) => date.endOf('week')

export const getEndOfMonth = (date: Moment) => date.endOf('month')

export const addMinutes = (date: Moment, amount: number) => date.add(amount, 'minutes')

export const addDays = (date: Moment, amount: number) => date.add(amount, 'days')

export const addWeeks = (date: Moment, amount: number) => date.add(amount, 'weeks')

export const addMonths = (date: Moment, amount: number) => date.add(amount, 'months')

export const addYears = (date: Moment, amount: number) => date.add(amount, 'years')

export const subtractMinutes = (date: Moment, amount: number) => date.subtract(amount, 'minutes')

export const subtractDays = (date: Moment, amount: number) => date.subtract(amount, 'days')

export const subtractWeeks = (date: Moment, amount: number) => date.subtract(amount, 'weeks')

export const subtractMonths = (date: Moment, amount: number) => date.subtract(amount, 'months')

export const subtractYears = (date: Moment, amount: number) => date.subtract(amount, 'years')

export const isBefore = (date1: Moment, date2: Moment) => date1.isBefore(date2)

export const isAfter = (date1: Moment, date2: Moment) => date1.isAfter(date2)

export const equals = (date1: Moment, date2: Moment) => date1.isSame(date2)

export const isSameMonth = (date1: Moment, date2: Moment) => date1.isSame(date2, 'month')

export const isSameDay = (date1: Moment, date2: Moment) => date1 && date2 ? date1.isSame(date2, 'day') : !date1 && !date2

export const isSameUtcOffset = (date1: Moment, date2: Moment) => date1 && date2 ? date1.utcOffset === date2.utcOffset : !date1 && !date2

export const isDayInRange = (date: Moment, startDate: Moment, endDate: Moment) => {
    const before = startDate.clone().startOf('day').subtract(1, 'seconds')
    const after = endDate.clone().startOf('day').add(1, 'seconds')
    return date.clone().startOf('day').isBetween(before, after)
}

export const getDaysDiff = (date1: Moment, date2: Moment) => date1.diff(date2, 'days')

export const localizeDate = (date: Moment, locale: string) => date.clone().locale(locale || moment.locale())

export const getDefaultLocale = () => moment.locale()

export const getDefaultLocaleData = () => moment.localeData()

export const registerLocale = (localeName: string, localeData: string) => moment.defineLocale(localeName, localeData)

export const getLocaleData = (date: Moment) => date.localeData()

export const getLocaleDataForLocale = (locale: string) => moment.localeData(locale)

export const getWeekDaysMinForLocale = (locale: Moment, date: Moment) => locale.weekdaysMin(date)

export const getWeekDaysShortForLocale = (locale: Moment, date: Moment) => locale.weekdaysShort(date)

export const getMonthForLocale = (locale: Moment, date: Moment) => locale.months(date)

export const isDayDisabled = (day: Moment, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) => (minDate && isBefore(minDate, day)) ||
(maxDate && isAfter(maxDate, day)) ||
(excludeDates && excludeDates.some(excludeDate => isSameDay(excludeDate, day))) ||
(includeDates && !includeDates.some(includeDate => isSameDay(includeDate, day))) ||
(filterDate && !filterDate(clone(day))) ||
false

export const isTimeDisabled = (time: Moment, disabledTimes: Array<Moment>) => disabledTimes.map(disabledTime => (getHours(disabledTime) === getHours(time)) && (getMinutes(disabledTime) === getMinutes(time)))

export const isTimeInDisabledRange = (time: Moment, {minTime, maxTime}) => {
    if(!minTime || !maxTime) throw new Error('isTimeInDisabledRange: Both minTime and maxTime prop required')
    const base = moment().hours(0).minutes(0).seconds(0)
    const baseTime = clone(base).hours(getHours(time)).minutes(getMinutes(time))
    const min = clone(base).hours(getHours(minTime)).minutes(getMinutes(minTime))
    const max = clone(base).hours(getHours(maxTime)).minutes(getMinutes(maxTime))

    return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max))
}

export const allDaysDisabledBefore = (day: Moment, unit: string, {minDate, includeDates} = {}) => {
    const dateBefore = clone(day).subtract(1, unit)
    return (minDate && dateBefore.isBefore(minDate, unit)) || (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) || false
}

export const allDaysDisabledAfter = (day: Moment, unit: string, {maxDate, includeDates} = {}) => {
    const dateAfter = clone(day).add(1, unit)
    return (maxDate && dateAfter.isAfter(maxDate, unit)) || (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) || false
}

export const getEffectiveMinDate = ({minDate, includeDates}) => (minDate && includeDates && moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day')))) ||
(includeDates && moment.min(includeDates)) || minDate

export const getEffectiveMaxDate = ({maxDate, includeDates}) => (maxDate && includeDates && moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day')))) ||
(includeDates && moment.max(includeDates)) || maxDate
