import {IBookCategory, IBookCategoryWithCount} from '../types/book-categories';
import {IBook} from '../types/books';

export const makeNavCategories = (books: IBook[], categories: IBookCategory[]) => {
    const countObj = books.reduce((acc: Record<string, number>, book) => {
        book.categories?.map(category => {
            if (acc[category]) {
                acc[category] += 1

                return acc
            }

            acc[category] = 1

            return acc
        })

        return acc
    }, {})

    return categories.reduce((acc: IBookCategoryWithCount[], category, index) => {
        if (index === 0) {
            return [
                ...acc,
                {id: 0, name: 'Все книги', path: 'all', count: null},
                {...category, count: countObj[category.name]}
            ]
        }

        return [...acc, {...category, count: countObj[category.name] ? countObj[category.name] : 0}]
    }, [])

}
