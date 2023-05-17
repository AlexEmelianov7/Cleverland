import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApiUrlEndPoints, axiosInstance } from '../../books_api/books-api';
import { IForgotPassRequest } from '../../types/authorization';
import {
    forgotPasswordFetching,
    forgotPasswordFetchingError,
    forgotPasswordFetchingSuccess
} from '../password-recovery-slice/password-recovery-slice';

function* forgotPasswordFetchingWorker({payload}: PayloadAction<IForgotPassRequest>) {
    try {
        yield call(axiosInstance.post,
            `${ApiUrlEndPoints.forgotPassword}`, {...payload})

        yield put(forgotPasswordFetchingSuccess())
    }
    catch {
        yield put(forgotPasswordFetchingError('error'))
    }
}

export function* forgotPasswordFetchingWatcher() {
    yield takeLatest(forgotPasswordFetching.type, forgotPasswordFetchingWorker)
}
