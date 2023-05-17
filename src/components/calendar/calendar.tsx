import React, { FC, Fragment, useState } from "react";
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import arrowUpIcon from '../../assets/icons/arrow-up.svg';
import closeIcon from '../../assets/icons/modal-close.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import {
    bookingCancelFetching,
    bookingEditFetching,
    bookingFetching
} from '../../store/booking/booking-slice';
import { IBookingCancelRequest, IBookingRequestWithBookId } from '../../types/booking';
import { getCurrentYearMonthArray, getDropdownDateTitle, getMonthMatrix } from '../../utils/dayjs';
import { Button, ButtonType } from '../common/button/button';

import { Day } from './day/day';
import { Dropdown } from './dropdown/dropdown';

import styles from './calendar.module.css';

interface CalendarProps {
    onClose: () => void
}

export const Calendar: FC<CalendarProps> = ({ onClose }) => {
    const { user } = useAppSelector(state => state.auth);
    const { selectedBookId } = useAppSelector(state => state.booking);
    const { books } = useAppSelector(state => state.books);

    const dispatch = useAppDispatch();

    const { bookId } = useParams();

    const selectedBook = books?.find(book => book.id.toString() === selectedBookId);

    const isCurrentUserBooking = selectedBook?.booking?.customerId === user?.id;

    const [currentYear, setCurrentYear] = useState(dayjs().year());
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [monthMatrix, setMonthMatrix] = useState(getMonthMatrix(currentYear, monthIndex));
    const [selectedDay, setSelectedDay] = useState(
        isCurrentUserBooking ?
            dayjs(selectedBook?.booking?.dateOrder).locale('ru') : null
    );

    const handleSelectedDay = (day: Dayjs) => setSelectedDay(day);

    const incrementMonthIndex = () => {
        if (monthIndex === 11) {
            setMonthIndex(0);
            setCurrentYear(currentYear + 1);
        } else {
            setMonthIndex(monthIndex + 1);
        }
    }

    const decrementMonthIndex = () => {
        if (monthIndex === 0) {
            setMonthIndex(11);
            setCurrentYear(currentYear - 1);
        } else {
            setMonthIndex(monthIndex - 1);
        }
    }

    const changeMonthIndex = (index: number) => setMonthIndex(index);

    const handleBooking = () => {
        const bookingRequestData: IBookingRequestWithBookId = {
            data: {
                book: selectedBookId!,
                customer: user!.id.toString(),
                dateOrder: selectedDay!.format(),
                order: true
            },
            bookingId: selectedBook?.booking?.id.toString(),
            bookId
        }

        if (isCurrentUserBooking) {
            dispatch(bookingEditFetching(bookingRequestData))
        } else {
            dispatch(bookingFetching(bookingRequestData))
        }
    }

    const handleCancelBooking = () => {
        const bookingRequestData: IBookingCancelRequest = {
            bookingId: selectedBook!.booking!.id.toString(),
            bookId,
        }

        dispatch(bookingCancelFetching(bookingRequestData));
    }

    return (
        <div className={styles.calendarWrapper}>
            <h2 className={styles.title}>
                {isCurrentUserBooking ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
            </h2>
            <img
                className={styles.closeIcon}
                onClick={onClose}
                src={closeIcon}
                alt='close'
                role='presentation'
            />
            <div className={styles.calendar}>
                <div className={styles.selectBlock}>
                    <Dropdown
                        dateTitle={getDropdownDateTitle(currentYear, monthIndex)}
                        dropdownList={getCurrentYearMonthArray(currentYear)}
                        changeMonthIndex={changeMonthIndex}
                    />
                    <div className={styles.changeMonth}>
                        <img
                            onClick={decrementMonthIndex}
                            src={arrowUpIcon}
                            alt='arrow'
                            role='presentation'
                        />
                        <img
                            onClick={incrementMonthIndex}
                            src={arrowDownIcon}
                            alt='arrow'
                            role='presentation'
                        />
                    </div>
                </div>
                <div className={styles.days}>
                    {monthMatrix.map((row, index) => (
                        <Fragment key={uuidv4()}>
                            {row.map((day) => (
                                <Day
                                    key={uuidv4()}
                                    day={day}
                                    currentYear={currentYear}
                                    monthIndex={monthIndex}
                                    row={index}
                                    changeSelectedDay={handleSelectedDay}
                                    selectedDay={selectedDay}
                                />
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
            <Button
                name='Забронировать'
                type={ButtonType.submit}
                onClick={handleBooking}
                disabled={
                    !selectedDay ||
                    (selectedDay.isSame(dayjs(selectedBook?.booking?.dateOrder).locale('ru')) && isCurrentUserBooking)
                }
            />
            {isCurrentUserBooking && (
                <Button
                    name='Отменить бронь'
                    type={ButtonType.submit}
                    onClick={handleCancelBooking}
                />
            )}
        </div>
    );
};
