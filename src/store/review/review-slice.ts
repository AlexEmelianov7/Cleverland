import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { IReviewFields, IReviewResponse } from '../../types/review';

export interface ReviewState {
    review: IReviewResponse | null
    isLoading: boolean
    error: string | null
}

const initialState: ReviewState = {
    review: null,
    isLoading: false,
    error: null
}

export const reviewSlice = createSlice( {
    name: 'review',
    initialState,
    reducers: {
        reviewFetching: (state, _: PayloadAction<IReviewFields>) => {
            state.review = null
            state.isLoading = true
            state.error = null
        },
        reviewFetchingSuccess: (state, action: PayloadAction<IReviewResponse>) => {
            state.review = action.payload
            state.isLoading = false
            state.error = null
        },
        reviewFetchingError: (state, action: PayloadAction<string | null>) => {
            state.review = null
            state.isLoading = false
            state.error = action.payload
        },
        reviewClearing: state => {
            state.review = null
            state.isLoading = false
            state.error = null
        },
    }
})

export const
    {
        reviewFetching,
        reviewFetchingSuccess,
        reviewFetchingError,
        reviewClearing
    } = reviewSlice.actions

export const reviewReducer = reviewSlice.reducer
