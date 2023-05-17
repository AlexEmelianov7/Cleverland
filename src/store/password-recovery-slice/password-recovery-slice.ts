import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IForgotPassRequest, IResetPassRequest} from '../../types/authorization';
import { RecoveryErrors } from '../../types/errors';

export interface PasswordRecoveryState {
    isForgotPassSuccess: boolean
    isResetPassSuccess: boolean
    isLoading: boolean
    error: string | null
}

const initialState: PasswordRecoveryState = {
    isForgotPassSuccess: false,
    isResetPassSuccess: false,
    isLoading: false,
    error: null
}

export const passwordRecoverySlice = createSlice( {
    name: 'password-recovery',
    initialState,
    reducers: {
        forgotPasswordFetching: (state, _: PayloadAction<IForgotPassRequest>) => {
            state.isForgotPassSuccess = false
            state.isResetPassSuccess = false
            state.isLoading = true
            state.error = null
        },
        forgotPasswordFetchingSuccess: state => {
            state.isForgotPassSuccess = true
            state.isResetPassSuccess = false
            state.isLoading = false
        },
        forgotPasswordFetchingError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false
            state.error = action.payload
        },
        resetPasswordFetching: (state, _: PayloadAction<IResetPassRequest>) => {
            state.isForgotPassSuccess = false
            state.isResetPassSuccess = false
            state.isLoading = true
            state.error = null
        },
        resetPasswordFetchingSuccess: state => {
            state.isForgotPassSuccess = false
            state.isResetPassSuccess = true
            state.isLoading = false
        },
        resetPasswordFetchingError: (state, action: PayloadAction<RecoveryErrors>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const
    {
        forgotPasswordFetching,
        forgotPasswordFetchingSuccess,
        forgotPasswordFetchingError,
        resetPasswordFetching,
        resetPasswordFetchingSuccess,
        resetPasswordFetchingError
    } = passwordRecoverySlice.actions

export const passwordRecoveryReducer = passwordRecoverySlice.reducer
