import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { IBookingCancelRequest, IBookingRequestWithBookId } from '../../types/booking';

export interface BookingState {
    selectedBookId: string | null
    isLoading: boolean
}

const initialState: BookingState = {
    selectedBookId: null,
    isLoading: false
}

export const bookingSlice = createSlice( {
    name: 'booking',
    initialState,
    reducers: {
        bookingFetching: (state, _: PayloadAction<IBookingRequestWithBookId>) => {
            state.selectedBookId = null
            state.isLoading = true
        },
        bookingFetchingSuccess: state => {
            state.isLoading = false
        },
        bookingFetchingError: state => {
            state.isLoading = false
        },
        bookingEditFetching: (state, _: PayloadAction<IBookingRequestWithBookId>) => {
            state.selectedBookId = null
            state.isLoading = true
        },
        bookingCancelFetching: (state, _: PayloadAction<IBookingCancelRequest>) => {
            state.selectedBookId = null
            state.isLoading = true
        },
        settingBookId: (state, action: PayloadAction<string | null>) => {
            state.selectedBookId = action.payload
        },
    }
})

export const
    {
        bookingFetching,
        bookingFetchingSuccess,
        bookingFetchingError,
        bookingEditFetching,
        bookingCancelFetching,
        settingBookId
    } = bookingSlice.actions

export const bookingReducer = bookingSlice.reducer
