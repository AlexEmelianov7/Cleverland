import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';

import {ApiUrlEndPoints, axiosInstance, RequestError} from '../../books_api/books-api';
import {IBookDetailed} from '../../types/books';
import {
    bookDetailedFetching,
    bookDetailedFetchingError,
    bookDetailedFetchingSuccess
} from '../book-detailed/book-detailed-slice';

function* bookDetailedFetchingWorker({ payload }: PayloadAction<number>) {
    try {
        const { data }: AxiosResponse<IBookDetailed> = yield call(
            axiosInstance.get, `${ApiUrlEndPoints.books}/${payload}`
        )

        yield put(bookDetailedFetchingSuccess(data))
    } catch {
        yield put(bookDetailedFetchingError(RequestError.errorMessage))
    }
}

export function* booksDetailedFetchingWatcher() {
    yield takeLatest(bookDetailedFetching.type, bookDetailedFetchingWorker)
}
