export interface IBook {
    issueYear: string | null
    rating: number | null
    title: string
    authors: string[] | null
    image: IBookImage
    categories: string[] | null
    id: number
    booking: IBookBooking | null
    delivery: IBookDelivery | null
    histories: IBookHistory[] | null
}

export interface IBookDetailed {
    id: number
    title: string
    rating: number | null
    issueYear: string | null
    description: string | null
    publish: string | null
    pages: string | null
    cover: string | null
    weight: string | null
    format: string | null
    ISBN: string | null
    producer: string | null
    authors: string[] | null
    images: IBookImage[]
    categories: string[]
    comments: IBookReview[] | null
    booking: IBookBooking | null
    delivery: IBookDelivery | null
    histories: IBookHistory[] | null
}

export interface IBookImage {
    url: string | null
}

export interface IBookBooking {
    id: number
    order: boolean
    dateOrder: string | null
    customerId: number | null
    customerFirstName: string | null
    customerLastName: string | null
}

export interface IBookDelivery {
    id: number
    handed: boolean
    dateHandedFrom: string | null
    dateHandedTo: string | null
    recipientId: number | null
    recipientFirstName: string | null
    recipientLastName: string | null
}

interface IBookHistory {
    id: number | null
    userId: number | null
}

export interface IBookReview {
    text: string | null
    createdAt: string
    rating: number | null
    id: number
    user: {
        commentUserId: number
        firstName: string
        lastName: string
        avatarUrl: string | null
    }
}
