import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { ApiUrlEndPoints, axiosInstance } from '../../books_api/books-api';
import { IAuthResponse, IRegistrationFields } from '../../types/authorization';
import { RegistrationErrors } from '../../types/errors';
import {
    registrationFetching,
    registrationFetchingError,
    registrationFetchingSuccess
} from '../registration/registration-slice';

function* registrationFetchingWorker({payload}: PayloadAction<IRegistrationFields>) {
    try {
        const { data }: AxiosResponse<IAuthResponse> = yield call(
            axiosInstance.post,
            `${ApiUrlEndPoints.registration}`,
            { ...payload }
        )

        yield put(registrationFetchingSuccess());
        yield localStorage.setItem('accessToken', data.jwt);
    }
    catch (error) {
        const { response } = error as AxiosError

        if (response?.status === 400) {
            yield put(registrationFetchingError(RegistrationErrors.notUniqueInfo))
        } else {
            yield put(registrationFetchingError(RegistrationErrors.smthWrong))
        }
    }
}

export function* registrationFetchingWatcher() {
    yield takeLatest(registrationFetching.type, registrationFetchingWorker);
}
