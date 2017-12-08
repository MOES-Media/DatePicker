import * as dateUtils from '../../utils/dates'
import moment from 'moment'

describe('utils: dates', () => {

    describe('date constructors', () => {
        it('should create a new date by default', () => {
            const day = dateUtils.newDate()
            expect(day.toString()).toBe(moment(day.toDate()).toString())
        })

        it('should create a new date from a string', () => {
            const day = dateUtils.newDate('2017-12-26')
            expect(day).not.toBeNull()
            expect(day).not.toBe(dateUtils.now())
        })

        it('should create a date with utcOffset', () => {
            const now = dateUtils.now(2)
            expect(now.utcOffset()).toBe(120)
        })
    })

    describe('isSameDay', () => {
        it('should return true when passing 2 null values', () => {
            expect(dateUtils.isSameDay(null, null)).toBe(true)
        })

        it('should return false when 1 value is null', () => {
            expect(dateUtils.isSameDay(dateUtils.now(), null)).toBe(false)
        })

        it('should return true when 2 dates are the same', () => {
            const now = dateUtils.now()
            const nowAgain = dateUtils.clone(now)
            expect(dateUtils.isSameDay(now, nowAgain)).toBe(true)
        })

        it('should return false for 2 dates that are not equal', () => {
            expect(dateUtils.isSameDay(dateUtils.newDate('2017-12-07'), dateUtils.newDate('2017-12-06'))).toBe(false)
        })
    })

    describe('isSameUtcOffset', () => {
        it('should return true when passing 2 null values', () => {
            expect(dateUtils.isSameUtcOffset(null, null)).toBe(true)
        })

        it('should return false when 1 value is null', () => {
            expect(dateUtils.isSameUtcOffset(null, dateUtils.now())).toBe(false)
        })

        it('should return true for different dates but in the same utc zone', () => {
            expect(dateUtils.isSameUtcOffset(dateUtils.newDate('2017-12-12'), dateUtils.newDate('2017-12-11'))).toBe(true)
        })

        it('should return false for the same date but in different utc zone', () => {
            expect(dateUtils.isSameUtcOffset(dateUtils.setUtcOffSet(dateUtils.newDate('2017-12-01'), -3), dateUtils.setUtcOffSet(dateUtils.newDate('2017-12-01'), 3))).toBe(false)
        })
    })

    describe('isDayDisabled', () => {
        it('should return false by default', () => {
            expect(dateUtils.isDayDisabled(dateUtils.now())).toBe(false)
        })

        it('should return true if day equals minDate', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {minDate: day})).toBe(true)
        })

        it('should return true if day is before minDate', () => {
            const day = dateUtils.now()
            const dayBefore = dateUtils.subtractDays(dateUtils.clone(day), 1)
            expect(dateUtils.isDayDisabled(dayBefore, {minDate: day})).toBe(true)
        })

        it('should return false if day equals maxDate', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {maxDate: day})).toBe(true)
        })

        it('should return true if day is after maxDate', () => {
            const day = dateUtils.now()
            const dayAfter = dateUtils.addDays(dateUtils.clone(day), 1)
            expect(dateUtils.isDayDisabled(dayAfter, {maxDate: day})).toBe(true)
        })

        it('should return true if in excludeDates', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {excludeDates: [day]})).toBe(true)
        })

        it('should return false if not in excludeDates', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {excludeDates: [dateUtils.subtractDays(dateUtils.clone(day), 1)]})).toBe(false)
        })

        it('should return false if in includeDates', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {includeDates: [day]})).toBe(false)
        })

        it('should return true if not in includeDates', () => {
            const day = dateUtils.now()
            expect(dateUtils.isDayDisabled(day, {includeDates: [dateUtils.subtractDays(dateUtils.clone(day), 1)]})).toBe(true)
        })

        it('should return false if dateFilter returns true', () => {
            const day = dateUtils.now()
            const filterDate = d => dateUtils.equals(day, d)
            expect(dateUtils.isDayDisabled(day, { filterDate })).toBe(false)
        })

        it('should return true if dateFilter returns false', () => {
            const day = dateUtils.now()
            const filterDate = d => !dateUtils.equals(day, d)
            expect(dateUtils.isDayDisabled(day, { filterDate })).toBe(true)
        })

        it('should not allow the dateFilter to modify the day', () => {
            const day = dateUtils.now()
            const dayClone = dateUtils.clone(day)
            const filterDate = d => {
                dateUtils.addDays(d, 1)
                return true
            }
            dateUtils.isDayDisabled(day, {filterDate})
            expect(dateUtils.equals(day, dayClone))
        })

        describe('allDaysDisabledBefore', () => {
            it('should return false by default', () => {
                const day = dateUtils.now()
                expect(dateUtils.allDaysDisabledBefore(day, 'month')).toBe(false)
            })

            it('should return true if minDate is in same unit', () => {
                const day = dateUtils.newDate('2017-12-10')
                const dayInMonth = dateUtils.newDate('2017-12-01')
                expect(dateUtils.allDaysDisabledBefore(day, 'month', {minDate: dayInMonth})).toBe(true)
            })

            it('should return false if minDate is not in the same unit', () => {
                const day = dateUtils.newDate('2017-12-10')
                const dayInPreviousMonth = dateUtils.newDate('2017-11-10')
                expect(dateUtils.allDaysDisabledBefore(day, 'month', {minDate: dayInPreviousMonth})).toBe(false)
            })

            it('should return true if previous unit is before includedDates', () => {
                const day = dateUtils.newDate('2017-12-10')
                const includeDates = [dateUtils.newDate('2017-12-01')]
                expect(dateUtils.allDaysDisabledBefore(day, 'month', {includeDates})).toBe(true)
            })
        })

        describe('allDaysDisabledAfter', () => {
            it('should return false by default', () => {
                const day = dateUtils.now()
                expect(dateUtils.allDaysDisabledAfter(day, 'month')).toBe(false)
            })

            it('should return true if maxDate is in same unit', () => {
                const day = dateUtils.newDate('2017-12-10')
                const dayInMonth = dateUtils.newDate('2017-12-11')
                expect(dateUtils.allDaysDisabledAfter(day, 'month', {maxDate: dayInMonth})).toBe(true)
            })

            it('should return false if maxDate is in the next unit', () => {
                const day = dateUtils.newDate('2017-11-10')
                const dayInNextMonth = dateUtils.newDate('2017-12-10')
                expect(dateUtils.allDaysDisabledAfter(day, 'month', {maxDate: dayInNextMonth})).toBe(false)
            })

            it('should return true if next unit is after included dates', () => {
                const day = dateUtils.newDate('2017-12-10')
                const includeDates = [dateUtils.newDate('2017-12-11')]
                expect(dateUtils.allDaysDisabledAfter(day, 'month', {includeDates})).toBe(true)
            })
        })

        describe('getEffectiveMinDate', () => {
            it('should return null by default', () => {
                expect(dateUtils.getEffectiveMinDate({})).toBeNull()
            })

            it('should return the minDate', () => {
                const minDate = dateUtils.newDate('2017-10-01')
                expect(dateUtils.getEffectiveMinDate({minDate})).toBe(minDate)
            })

            it('should return the earliest included date', () => {
                const day1 = dateUtils.newDate()
                const day2 = dateUtils.subtractMonths(dateUtils.clone(day1), 1)
                expect(dateUtils.getEffectiveMinDate({includeDates: [day1, day2]})).toBe(day2)
            })

            it('should return the minDate', () => {
                const day1 = dateUtils.now()
                const day2 = dateUtils.addMonths(dateUtils.clone(day1), 1)
                const minDate = dateUtils.subtractYears(dateUtils.clone(day2), 1)
                expect(dateUtils.getEffectiveMinDate({minDate, includeDates: [day2, day1]})).toBe(minDate)
            })

            it('should a date from the includedDates', () => {
                const day1 = dateUtils.now()
                const day2 = dateUtils.subtractYears(dateUtils.clone(day1), 1)
                const minDate = dateUtils.addMonths(dateUtils.clone(day1), 1)
                expect(dateUtils.getEffectiveMinDate({minDate, includeDates: [day2, day1]})).toBe(day2)
            })
        })

        describe('getEffectiveMaxDate', () => {
            it('should return null by default', () => {
                expect(dateUtils.getEffectiveMaxDate({})).toBeNull()
            })

            it('should return the maxDate', () => {
                const maxDate = dateUtils.newDate()
                expect(dateUtils.getEffectiveMaxDate({maxDate})).toBe(maxDate)
            })

            it('should return the latest included date', () => {
                const day1 = dateUtils.now()
                const day2 = dateUtils.addMonths(dateUtils.clone(day1), 1)
                expect(dateUtils.getEffectiveMaxDate({includeDates: [day1, day2]})).toBe(day2)
            })

            it('should return the maxDate', () => {
                const day1 = dateUtils.now()
                const day2 = dateUtils.addMonths(dateUtils.clone(day1), 1)
                const maxDate = dateUtils.addYears(dateUtils.clone(day2), 1)
                expect(dateUtils.getEffectiveMaxDate({maxDate, includeDates: [day2, day1]})).toBe(maxDate)
            })

            it('should return a date from the includedDates', () => {
                const day1 = dateUtils.now()
                const day2 = dateUtils.addYears(dateUtils.clone(day1), 1)
                const maxDate = dateUtils.addMonths(dateUtils.clone(day1), 1)
                expect(dateUtils.getEffectiveMaxDate({maxDate, includeDates: [day2, day1]})).toBe(day2)
            })
        })
    })

    describe('parseDate', () => {
        it('should return null when the datestring is invalid', () => {
            expect(dateUtils.parseDates('invalid', {dateFormat: 'DD/MM/YYYY'})).toBeNull()
        })

        it('should return a parsed date when passing in a valid dateString', () => {
            expect(dateUtils.parseDates('06/12/2017T00:00:00', { dateFormat: 'DD/MM/YYYY' }).toDate().getTime())
                .toBe(dateUtils.newDate('2017-12-06T00:00:00').toDate().getTime())
        })

        it('should return null when passing a valid dateString that doesn\'t match the pattern and strict is true', () => {
            expect(dateUtils.parseDates('06/12/2017T00:00:00', {dateFormat: 'DD/MM/YYYY', strict: true})).toBeNull()
        })

        it('should parse date when passing in unix timestamps', () => {
            const now = new Date()
            expect(dateUtils.parseDates(now.getTime(), {dateFormat: 'x'}).toDate().getTime()).toBe(now.getTime())
        })

        it('should parse date when passing in locale', () => {
            expect(dateUtils.parseDates('06/12/2017', {dateFormat: 'DD/MM/YYYY', locale: 'nl'}).toDate().getTime()).toBe(dateUtils.newDate("2017-12-05T23:00:00.000Z").toDate().getTime())
        })
    })

    describe('formatDate', () => {
        it('should format a date to the correct format', () => {
            expect(dateUtils.formatDate(dateUtils.newDate('2017-12-07'), 'DD/MM/YYYY')).toBe('07/12/2017')
        })
    })

    describe('safeDateFormat', () => {
        it('should format a date to the correct format, keeping the locale in mind', () => {
            expect(dateUtils.safeDateFormat(dateUtils.newDate('2017-12-07'), {dateFormat: 'MM-DD-YYYY', locale: 'en'})).toBe('12-07-2017')
        })
    })

    describe('isDayInRange', () => {
        it('should return true if date is between start- and enddate', () => {
            expect(dateUtils.isDayInRange(dateUtils.newDate('2017-12-07'), dateUtils.newDate('2017-12-01'), dateUtils.newDate('2017-12-31'))).toBe(true)
        })

        it('should return false if date is before startdate', () => {
            expect(dateUtils.isDayInRange(dateUtils.newDate('2017-11-30'), dateUtils.newDate('2017-12-01'), dateUtils.newDate('2017-12-31'))).toBe(false)
        })

        it('should return false if date is after enddate', () => {
            expect(dateUtils.isDayInRange(dateUtils.newDate('2018-01-01'), dateUtils.newDate('2017-12-01'), dateUtils.newDate('2017-12-31'))).toBe(false)
        })
    })

    describe('isTimeInDisabledRange', () => {
        it('should return true if time is between minTime and maxTime', () => {
            const now = dateUtils.now()
            const minTime = dateUtils.subtractHours(dateUtils.clone(now), 1)
            const maxTime = dateUtils.addHours(dateUtils.clone(now), 1)
            expect(dateUtils.isTimeInDisabledRange(now, {minTime, maxTime})).toBe(true)
        })

        it('should return false if time is before minTime', () => {
            const now = dateUtils.now()
            const minTime = dateUtils.subtractHours(dateUtils.clone(now), 1)
            const maxTime = dateUtils.addHours(dateUtils.clone(now), 1)
            expect(dateUtils.isTimeInDisabledRange(minTime, {minTime: now, maxTime})).toBe(false)
        })

        it('should return false if time is after maxTime', () => {
            const now = dateUtils.now()
            const minTime = dateUtils.subtractHours(dateUtils.clone(now), 1)
            const maxTime = dateUtils.addHours(dateUtils.clone(now), 1)
            expect(dateUtils.isTimeInDisabledRange(maxTime, {minTime, maxTime: now})).toBe(false)
        })

    })

    describe('isTimeDisabled', () => {
        it('should return false if time is not in disabled array', () => {
            expect(dateUtils.isTimeDisabled(dateUtils.newDate(), [dateUtils.subtractHours(dateUtils.newDate(), 1), dateUtils.subtractMinutes(dateUtils.newDate(), 30)])).toBe(false)
            expect(dateUtils.isTimeDisabled(dateUtils.newDate(), [dateUtils.addHours(dateUtils.newDate(), 1), dateUtils.addMinutes(dateUtils.newDate(),30)]))
        })

        it('should return true if time is in disabled array', () => {
            const now = dateUtils.now()
            expect(dateUtils.isTimeDisabled(now, [now, dateUtils.addMinutes(now, 20)])).toBe(true)
            expect(dateUtils.isTimeDisabled(now, [dateUtils.addMonths(now, 2)])).toBe(true)
        })
    })

})
