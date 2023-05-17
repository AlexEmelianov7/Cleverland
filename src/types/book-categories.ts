export interface IBookCategory {
    id: number
    name: string
    path: string
}

export interface IBookCategoryWithCount extends IBookCategory{
    count: number | null
}

