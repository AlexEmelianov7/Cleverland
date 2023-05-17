import React, { FC, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import bookNoPoster from '../../../assets/img/book-no-poster.jpg';
import { API_URL } from '../../../books_api/books-api';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux';
import { settingBookId } from '../../../store/booking/booking-slice';
import { IBook } from '../../../types/books';
import { getBookingMessage } from '../../../utils/get-booking-message';
import { Button, ButtonType, ButtonVariant } from '../../common/button/button';
import { Rating } from '../../common/rating/rating';
import { Highlighter } from '../../highlighter/highlighter';

import styles from './book-item.module.css';

export interface BookItemProps {
    book: IBook
    searchWord: string
    openBookingModal: () => void
}

export const BookItem: FC<BookItemProps> = ({book, searchWord, openBookingModal}) => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);

    const { category } = useParams();

    const navigate = useNavigate();

    const handleBookPageOpen = () => navigate(`/books/${category}/${book.id}`);

    const handleOpenBookingModal = (bookId: string) => {
        dispatch(settingBookId(bookId));
        openBookingModal()
    }

    return (
        <div data-test-id='card' className={styles.book} onClick={handleBookPageOpen} role='presentation'>
            <div className={styles.poster}>
                {book.image ?
                    <img src={`${API_URL}${book.image.url}`} alt="poster"/>
                    :
                    <img src={bookNoPoster} alt="poster"/>}
            </div>
            <div className={styles.rating}>
                {book.rating ?
                    <Rating roundedValue={Math.round(book.rating)}/>
                    :
                    <p>ещё нет оценок</p>
                }
            </div>
            <Highlighter className={styles.title} searchWord={searchWord} title={book.title}/>
            <p className={styles.info}>
                {book.authors && book.authors.map(author => <Fragment key={author}>{author}, </Fragment>)}
                {book.issueYear}
            </p>
            <Button
                className={styles.button}
                name={getBookingMessage(book.booking, book.delivery)}
                onClick={() => handleOpenBookingModal(book.id.toString())}
                type={ButtonType.button}
                disabled={(!!book.booking && book.booking.customerId !== user?.id) ||
                    !!book.delivery?.dateHandedTo}
                variant={!book.booking && !book.delivery ? ButtonVariant.primary : ButtonVariant.secondary}
            />
        </div>
    );
}
