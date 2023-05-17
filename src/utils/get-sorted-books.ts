import {IBook} from '../types/books';

export const getSortedBooks = (books: IBook[], descendingSort: boolean) => {
    const booksWithRating = books.filter(book => book.rating);
    const booksWithoutRating = books.filter(book => !book.rating);

    if (descendingSort) {
        return [...booksWithRating.sort((a ,b) => b.rating! - a.rating!), ...booksWithoutRating]
    }

    return [...booksWithoutRating, ...booksWithRating.sort((a, b) => a.rating! - b.rating!)];
}
