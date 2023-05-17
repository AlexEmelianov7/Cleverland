import { fork } from 'redux-saga/effects';

import { authFetchingWatcher } from './auth';
import {booksDetailedFetchingWatcher} from './book-detailed';
import { bookingFetchingWatcher } from './booking';
import {booksFetchingWatcher} from './books';
import { bookingCancelFetchingWatcher } from './cancel-booking';
import { bookingEditFetchingWatcher } from './edit-booking';
import { forgotPasswordFetchingWatcher } from './forgot-password';
import { registrationFetchingWatcher } from './registration';
import { resetPasswordFetchingWatcher } from './reset-password';
import { reviewFetchingWatcher } from './review';

export function* rootWatcher() {
    yield fork(booksFetchingWatcher)
    yield fork(booksDetailedFetchingWatcher)
    yield fork(registrationFetchingWatcher)
    yield fork(authFetchingWatcher)
    yield fork(forgotPasswordFetchingWatcher)
    yield fork(resetPasswordFetchingWatcher)
    yield fork(reviewFetchingWatcher)
    yield fork(bookingFetchingWatcher)
    yield fork(bookingEditFetchingWatcher)
    yield fork(bookingCancelFetchingWatcher)
}
