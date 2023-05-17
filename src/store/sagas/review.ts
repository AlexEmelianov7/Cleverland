import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';

import {ApiUrlEndPoints, axiosInstance, RequestError} from '../../books_api/books-api';
import {IBookDetailed} from '../../types/books';
import { IReviewFields, IReviewResponse } from '../../types/review';
import { bookDetailedFetchingSuccess } from '../book-detailed/book-detailed-slice';
import { reviewFetching, reviewFetchingError, reviewFetchingSuccess } from '../review/review-slice';

function* reviewFetchingWorker({ payload }: PayloadAction<IReviewFields>) {
    try {
        const { data }: AxiosResponse<IReviewResponse> = yield call(
            axiosInstance.post,
            `${ApiUrlEndPoints.comments}`,
            { data: payload }
        )

        const { data: bookData }: AxiosResponse<IBookDetailed> = yield call(
            axiosInstance.get,
            `${ApiUrlEndPoints.books}/${payload.book}`
        )

        yield put(reviewFetchingSuccess(data))
        yield put(bookDetailedFetchingSuccess(bookData))
    } catch {
        yield put(reviewFetchingError(RequestError.errorMessage))
    }
}

export function* reviewFetchingWatcher() {
    yield takeLatest(reviewFetching.type, reviewFetchingWorker)
}
