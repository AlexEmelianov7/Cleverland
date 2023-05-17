import {IBookCategory} from '../types/book-categories';
import {IBook} from '../types/books';

export const getFilteredBooks = (
    books: IBook[],
    categories: IBookCategory[] | null,
    category: string | undefined,
    searchFilter: string
) => {
    const categoryName = categories?.find(({ path }) => path === category)?.name

    if (!categoryName) {
        return books.filter(elem => elem.title.toLowerCase().includes(searchFilter.toLowerCase()))
    }

    return books?.filter(
        elem =>
            elem.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
            elem.categories?.includes(categoryName)
    )
}
