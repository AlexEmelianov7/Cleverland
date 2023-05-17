import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { IAuthFields, IUser } from '../../types/authorization';
import { AuthErrors } from '../../types/errors';

export interface AuthState {
    user: IUser | null
    isLoading: boolean
    error: string | null
}

let initialUserState = null;
const savedUserData = localStorage.getItem('user');

if (savedUserData !== null) {
    initialUserState = JSON.parse(savedUserData)
}

const initialState: AuthState = {
    user: initialUserState,
    isLoading: false,
    error: null
}

export const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        authFetching: (state, _: PayloadAction<IAuthFields>) => {
            state.user = null
            state.isLoading = true
            state.error = null
        },
        authFetchingSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isLoading = false
        },
        authFetchingError: (state, action: PayloadAction<AuthErrors>) => {
            state.isLoading = false
            state.error = action.payload
        },
        logout: state => {
            state.user = null
            state.isLoading = false
            state.error = null
        },
    }
})

export const
    {
        authFetching,
        authFetchingSuccess,
        authFetchingError,
        logout
    } = authSlice.actions

export const authReducer = authSlice.reducer
