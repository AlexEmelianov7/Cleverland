import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';

import {ApiUrlEndPoints, axiosInstance} from '../../books_api/books-api';
import { IBookingCancelRequest } from '../../types/booking';
import { IBook, IBookDetailed } from '../../types/books';
import { bookDetailedFetchingSuccess } from '../book-detailed/book-detailed-slice';
import {
    bookingCancelFetching,
    bookingFetchingError,
    bookingFetchingSuccess
} from '../booking/booking-slice';
import { booksFetchingSuccess } from '../books/books-slice';

function* bookingCancelFetchingWorker({ payload }: PayloadAction<IBookingCancelRequest>) {
    try {
        yield call(axiosInstance.delete, `${ApiUrlEndPoints.booking}/${payload.bookingId}`);

        if (payload.bookId) {
            const { data: bookDetailedData }: AxiosResponse<IBookDetailed> = yield call(
                axiosInstance.get,
                `${ApiUrlEndPoints.books}/${payload.bookId}`
            )

            yield put(bookDetailedFetchingSuccess(bookDetailedData));
        }
        else {
            const { data: bookData }: AxiosResponse<IBook[]> = yield call(
                axiosInstance.get,
                `${ApiUrlEndPoints.books}`
            )

            yield put(booksFetchingSuccess(bookData));
        }

        yield put(bookingFetchingSuccess());
    } catch {
        yield put(bookingFetchingError());
    }
}

export function* bookingCancelFetchingWatcher() {
    yield takeLatest(bookingCancelFetching.type, bookingCancelFetchingWorker)
}
