import createSagaMiddleware from 'redux-saga';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import { authReducer } from './auth/auth-slice';
import {bookDetailedReducer} from './book-detailed/book-detailed-slice';
import { bookingReducer } from './booking/booking-slice';
import {booksReducer} from './books/books-slice';
import { passwordRecoveryReducer } from './password-recovery-slice/password-recovery-slice';
import { registrationReducer } from './registration/registration-slice';
import { reviewReducer } from './review/review-slice';
import {rootWatcher} from './sagas';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    books: booksReducer,
    bookDetailed: bookDetailedReducer,
    auth: authReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    review: reviewReducer,
    booking: bookingReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootWatcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

