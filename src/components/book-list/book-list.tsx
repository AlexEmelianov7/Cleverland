import React from 'react';

import {DisplayVariant, useDisplay} from '../../context/display-context';
import {IBook} from '../../types/books';

import {BookItem} from './book-item/book-item';
import {BookItemList} from './book-item-list/book-item-list';

import styles from './book-list.module.css';

interface BookListProps {
    books: IBook[] | null
    searchWord: string
    openBookingModal: () => void
}
export const BookList = ({ books, searchWord, openBookingModal }: BookListProps) => {
    const { display } = useDisplay();
    const displayVariant = display === DisplayVariant.tile ? styles.bookListTile : styles.bookList;

    return(
        <div className={displayVariant}>
            {books?.map(( book ) => {
                if (display === DisplayVariant.tile) {
                    return (
                        <BookItem
                            openBookingModal={openBookingModal}
                            searchWord={searchWord}
                            book={book}
                            key={book.id}
                        />
                    );
                }

                    return (
                    <BookItemList
                        openBookingModal={openBookingModal}
                        searchWord={searchWord}
                        book={book}
                        key={book.id}
                    />
                );
            })}
        </div>
    );
};
