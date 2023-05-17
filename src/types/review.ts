export interface IReviewFields {
    rating: number
    text: string
    book: string
    user: string
}
export interface IReviewResponse {
    data: {
        id: number
        attributes: {
            rating: number
            text: string
            createdAt: string
            updatedAt: string
            publishedAt: string
        }
    },
    meta: object
}
