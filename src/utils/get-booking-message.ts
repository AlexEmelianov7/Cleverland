import dayjs from 'dayjs';

import { IBookBooking, IBookDelivery } from '../types/books';

export const getBookingMessage = (booking: IBookBooking | null, delivery: IBookDelivery | null ) => {
    if (booking === null) {
        return 'Забронировать'
    }

    if (delivery && delivery.dateHandedTo) {
        return `Занята до ${dayjs(delivery.dateHandedTo, 'DD MM')}`
    }

    return 'Забронирована'
}
