import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApiUrlEndPoints, axiosInstance } from '../../books_api/books-api';
import { IResetPassRequest } from '../../types/authorization';
import { RecoveryErrors } from '../../types/errors';
import {
    resetPasswordFetching,
    resetPasswordFetchingError,
    resetPasswordFetchingSuccess
} from '../password-recovery-slice/password-recovery-slice';

function* resetPasswordFetchingWorker({payload}: PayloadAction<IResetPassRequest>) {
    try {
        yield call(axiosInstance.post,
            `${ApiUrlEndPoints.resetPassword}`, {...payload})

        yield put(resetPasswordFetchingSuccess())
    }
    catch {
        yield put(resetPasswordFetchingError(RecoveryErrors.smthWrong))
    }
}

export function* resetPasswordFetchingWatcher() {
    yield takeLatest(resetPasswordFetching.type, resetPasswordFetchingWorker)
}
