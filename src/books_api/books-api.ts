import axios from 'axios';

export enum RequestError {
    errorMessage = 'Что-то пошло не так. Обновите страницу через некоторое время.'
}

export enum ApiUrlEndPoints {
    books = '/api/books',
    categories = '/api/categories',
    authorization = '/api/auth/local',
    registration = '/api/auth/local/register',
    forgotPassword = '/api/auth/forgot-password',
    resetPassword = '/api/auth/reset-password',
    booking = '/api/bookings',
    comments = '/api/comments'
}

export const API_URL = 'https://strapi.cleverland.by'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    return config
})
