export interface IBookingRequest {
    data: {
        order: boolean
        dateOrder: string
        book: string
        customer: string
    }
}

export interface IBookingRequestWithBookId extends IBookingRequest {
    bookingId?: string
    bookId?: string
}

export interface IBookingCancelRequest {
    bookingId: string
    bookId?: string
}
