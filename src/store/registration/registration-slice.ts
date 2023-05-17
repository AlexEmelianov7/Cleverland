import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IRegistrationFields} from '../../types/authorization';
import { RegistrationErrors } from '../../types/errors';

export interface RegistrationState {
    isSuccess: boolean
    isLoading: boolean
    error: string | null
}

const initialState: RegistrationState = {
    isSuccess: false,
    isLoading: false,
    error: null
}

export const registrationSlice = createSlice( {
    name: 'registration',
    initialState,
    reducers: {
        registrationFetching: (state, _: PayloadAction<IRegistrationFields>) => {
            state.isSuccess = false
            state.isLoading = true
            state.error = null
        },
        registrationFetchingSuccess: state => {
            state.isSuccess = true
            state.isLoading = false
        },
        registrationFetchingError: (state, action: PayloadAction<RegistrationErrors>) => {
            state.isLoading = false
            state.error = action.payload
        },
        clearingRegistrationData: state => {
            state.isSuccess = false
            state.error = null
        },
    }
})

export const
    {
        registrationFetching,
        registrationFetchingSuccess,
        registrationFetchingError,
        clearingRegistrationData
    } = registrationSlice.actions

export const registrationReducer = registrationSlice.reducer
