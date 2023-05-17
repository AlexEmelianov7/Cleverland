import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';

import {ApiUrlEndPoints, axiosInstance} from '../../books_api/books-api';
import { IBookingRequestWithBookId } from '../../types/booking';
import { IBook, IBookDetailed } from '../../types/books';
import { bookDetailedFetchingSuccess } from '../book-detailed/book-detailed-slice';
import {
    bookingFetching,
    bookingFetchingError,
    bookingFetchingSuccess
} from '../booking/booking-slice';
import { booksFetchingSuccess } from '../books/books-slice';

function* bookingFetchingWorker({ payload }: PayloadAction<IBookingRequestWithBookId>) {
    try {
        yield call(axiosInstance.post, ApiUrlEndPoints.booking, { data: payload.data });

        if (payload.bookId) {
            const { data: bookDetailedData }: AxiosResponse<IBookDetailed> = yield call(
                axiosInstance.get,
                `${ApiUrlEndPoints.books}/${payload.data.book}`
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

export function* bookingFetchingWatcher() {
    yield takeLatest(bookingFetching.type, bookingFetchingWorker)
}
