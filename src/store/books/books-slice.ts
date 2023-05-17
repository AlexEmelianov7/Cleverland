import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IBookCategory} from '../../types/book-categories';
import {IBook} from '../../types/books';

export interface BooksState {
    books: IBook[] | null
    categories: IBookCategory[] | null
    isLoading: boolean
    error: string | null
}

const initialState: BooksState = {
    books: null,
    categories: null,
    isLoading: false,
    error: null
}

export const booksSlice = createSlice( {
    name: 'books',
    initialState,
    reducers: {
        booksFetching: state => {
            state.books = null
            state.categories = null
            state.error = null
            state.isLoading = true
        },
        booksWithCategoriesFetching: state => {
            state.books = null
            state.error = null
            state.isLoading = true
        },
        booksFetchingSuccess: (state, action: PayloadAction<IBook[]>) => {
            state.isLoading = false
            state.books = action.payload
        },
        booksFetchingError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false
            state.error = action.payload
        },
        categoriesFetchingSuccess: (state, action: PayloadAction<IBookCategory[]>) => {
            state.isLoading = false
            state.categories = action.payload
        },
    },
})

export const
    {
        booksFetching,
        booksWithCategoriesFetching,
        booksFetchingSuccess,
        booksFetchingError,
        categoriesFetchingSuccess
    } = booksSlice.actions

export const booksReducer = booksSlice.reducer
