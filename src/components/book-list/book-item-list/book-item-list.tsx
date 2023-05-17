import React, { FC, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import bookNoPoster from '../../../assets/img/book-no-poster.jpg';
import { API_URL } from '../../../books_api/books-api';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux';
import { settingBookId } from '../../../store/booking/booking-slice';
import { getBookingMessage } from '../../../utils/get-booking-message';
import { Button, ButtonType, ButtonVariant } from '../../common/button/button';
import { Rating } from '../../common/rating/rating';
import { Highlighter } from '../../highlighter/highlighter';
import { BookItemProps } from '../book-item/book-item';

import styles from './book-item-list.module.css';

export const BookItemList: FC<BookItemProps> = ({book, searchWord, openBookingModal}) => {
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
        <div className={styles.bookListItem} onClick={handleBookPageOpen} role='presentation'>
            <div className={styles.poster}>
                {book.image ?
                    <img src={`${API_URL}${book.image.url}`} alt="poster"/>
                    :
                    <img src={bookNoPoster} alt="poster"/>}
            </div>
            <div className={styles.content}>
                <div className={styles.contentTop}>
                    <Highlighter className={styles.title} searchWord={searchWord} title={book.title}/>
                    <p className={styles.info}>
                        {book.authors && book.authors.map(author => <Fragment key={author}>{author}, </Fragment>)}
                        {book.issueYear}
                    </p>
                </div>
                <div className={styles.contentBottom}>
                    <div className={styles.rating}>
                        {book.rating ?
                            <Rating roundedValue={Math.round(book.rating)}/>
                            :
                            <p>ещё нет оценок</p>
                        }
                    </div>
                    <Button
                        className={styles.button}
                        name={getBookingMessage(book.booking, book.delivery)}
                        type={ButtonType.button}
                        onClick={() => handleOpenBookingModal(book.id.toString())}
                        disabled={(!!book.booking && book.booking.customerId !== user?.id) ||
                            !!book.delivery?.dateHandedTo}
                        variant={!book.booking && !book.delivery ? ButtonVariant.primary : ButtonVariant.secondary}
                    />
                </div>
            </div>
        </div>
    );

}
