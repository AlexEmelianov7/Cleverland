import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const convertDate = (date: string | undefined, format: string) => dayjs(date).format(format);

export const getDropdownDateTitle = (year: number, monthIndex: number) =>
    dayjs(new Date(year, monthIndex)).format('MMMM YYYY')
        .replace(/[a-zа-я]+/gi, match => match[0].toUpperCase() + match.substring(1));

export const getCurrentYearMonthArray = (year: number) => {
    const months = [];

    for (let i = 0; i < 12; i++) {
        const month = dayjs(new Date(year, i)).format('MMMM YYYY')
            .replace(/[a-zа-я]+/gi, match => match[0].toUpperCase() + match.substring(1));

        months.push(month)
    }

    return months;
}

export const getMonthMatrix = (year: number, month: number) => {
    const monthFirstDay = dayjs(new Date(year, month, 1)).weekday();
    const daysInMonth = dayjs().month(month).daysInMonth();
    const weeksInMonth = Math.ceil((monthFirstDay + daysInMonth) / 7);

    let currentMonthCount = 0 - monthFirstDay;

    return new Array(weeksInMonth).fill([]).map(() =>
        new Array(7).fill(null).map(() => {
            currentMonthCount += 1

            return dayjs(new Date(year, month, currentMonthCount))
        })
    )
}

export const isCurrentOrNextDay = (day: Dayjs): boolean => {
    const today = dayjs().startOf('day')
    let nextDay = today.add(1, 'day')

    if (today.day() === 6 || today.day() === 7) {
        nextDay = today.day(8).startOf('day')
    }

    if (nextDay.day() === 6 || nextDay.day() === 7) {
        nextDay = nextDay.day(8).startOf('day')
    }

    if (day.isSame(today, 'day') && (today.day() === 6 || today.day() === 0)) {
        return false
    }

    return day.isSame(today, 'day') || day.isSame(nextDay, 'day')
}
export const isCurrentDay = (day: Dayjs) => {
    const today = dayjs()

    return today.isSame(day, 'day')
}

export const isWeekend = (day: Dayjs, monthIndex: number, year: number) => {
    const current = dayjs(new Date(year, monthIndex))
    const startOfMonth = current.startOf('month')
    const endOfMonth = current.endOf('month')

    return (
        day.isSameOrAfter(startOfMonth) &&
        day.isSameOrBefore(endOfMonth) &&
        (day.weekday() === 5 || day.weekday() === 6)
    )
}
