import { all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {ApiUrlEndPoints, axiosInstance, RequestError} from '../../books_api/books-api';
import {IBookCategory} from '../../types/book-categories';
import {IBook} from '../../types/books';
import {
    booksFetching,
    booksFetchingError,
    booksFetchingSuccess,
    categoriesFetchingSuccess
} from '../books/books-slice';

function* booksFetchingWorker() {
    try {
        const [categories, books]: [AxiosResponse<IBookCategory[]>, AxiosResponse<IBook[]>] =
            yield all([
                call(axiosInstance.get, ApiUrlEndPoints.categories),
                call(axiosInstance.get, ApiUrlEndPoints.books),
            ])

        yield put(categoriesFetchingSuccess(categories.data))
        yield put(booksFetchingSuccess(books.data))
    } catch {
        yield put(booksFetchingError(RequestError.errorMessage))
    }
}

export function* booksFetchingWatcher() {
    yield takeLatest(booksFetching.type, booksFetchingWorker)
}
