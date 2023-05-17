import React, { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { isCurrentDay, isCurrentOrNextDay, isWeekend } from '../../../utils/dayjs';

import styles from './day.module.css';

interface DayProps {
    day: Dayjs
    currentYear: number
    monthIndex: number
    row: number
    changeSelectedDay: (day: Dayjs) => void
    selectedDay?: dayjs.Dayjs | null
}

export const Day: FC<DayProps> = (
    {
        day,
        currentYear,
        monthIndex,
        row,
        changeSelectedDay,
        selectedDay
    }) => {
    const handleChangeSelectedDay = (dayArg: Dayjs) => {
        if(isCurrentOrNextDay(day)) {
            changeSelectedDay(dayArg)
        }
    }

    return (
        <div
            className={styles.dayWrapper}
        >
            {row === 0 && <span>{day.format('dd')}</span>}
            <span className={`
                ${styles.day}
                ${isCurrentOrNextDay(day) ? styles.selectable : ''}
                ${isCurrentDay(day) ? styles.current : ''}
                ${isWeekend(day, monthIndex, currentYear) ? styles.weekend : ''}
                ${day.format('DD/MM/YYYY') === selectedDay?.format('DD/MM/YYYY') ? styles.selected : ''}
            `}
            >
                {day.format('DD')}
            </span>
        </div>
    );
};
