import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IBookDetailed} from '../../types/books';

export interface BookDetailedState {
    book: IBookDetailed | null
    isLoading: boolean
    error: string | null
}

const initialState: BookDetailedState = {
    book: null,
    isLoading: false,
    error: null
}

export const bookDetailedSlice = createSlice( {
    name: 'book-detailed',
    initialState,
    reducers: {
        bookDetailedFetchingSuccess: (state, action: PayloadAction<IBookDetailed>) => {
            state.isLoading = false
            state.book = action.payload
        },
        bookDetailedFetching: (state, _: PayloadAction<string>) => {
            state.book = null
            state.error = null
            state.isLoading = true
        },
        bookDetailedFetchingError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export const
    {
        bookDetailedFetching,
        bookDetailedFetchingSuccess,
        bookDetailedFetchingError
    } = bookDetailedSlice.actions

export const bookDetailedReducer = bookDetailedSlice.reducer
