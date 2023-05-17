import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { ApiUrlEndPoints, axiosInstance } from '../../books_api/books-api';
import { IAuthFields, IAuthResponse } from '../../types/authorization';
import { AuthErrors } from '../../types/errors';
import { authFetching, authFetchingError, authFetchingSuccess } from '../auth/auth-slice';

function* authFetchingWorker({payload}: PayloadAction<IAuthFields>) {
    try {
        const { data }: AxiosResponse<IAuthResponse> = yield call(
            axiosInstance.post,
            `${ApiUrlEndPoints.authorization}`,
            { ...payload }
        )

        yield put(authFetchingSuccess(data.user));
        yield localStorage.setItem('user', JSON.stringify(data.user));
        yield localStorage.setItem('accessToken', data.jwt);
    }
    catch (error) {
        const { response } = error as AxiosError

        if (response?.status === 400) {
            yield put(authFetchingError(AuthErrors.wrongInfo))
        } else {
            yield put(authFetchingError(AuthErrors.smthWrong))
        }
    }
}

export function* authFetchingWatcher() {
    yield takeLatest(authFetching.type, authFetchingWorker);
}
