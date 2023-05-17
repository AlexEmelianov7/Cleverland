import React, { FC, Fragment, useState } from 'react';

import chevron from '../../assets/icons/chevron.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { settingBookId } from '../../store/booking/booking-slice';
import { IBookDetailed } from '../../types/books';
import { getBookingMessage } from '../../utils/get-booking-message';
import { Button, ButtonType, ButtonVariant } from '../common/button/button';
import { Rating } from '../common/rating/rating';

import { DetailedInfo } from './detailed-info/detailed-info';
import { Reviews } from './reviews/reviews';
import { Slider } from './slider/slider';

import styles from './selected-book.module.css';

interface SelectedBookProps {
    book: IBookDetailed
    openReviewModal: () => void
    openBookingModal: () => void
}

export const SelectedBook: FC<SelectedBookProps> = (
    {
        book,
        openReviewModal,
        openBookingModal
    }) => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(true);

    const { user } = useAppSelector(state => state.auth);

    const handleOpenBookingModal = (bookId: string) => {
        dispatch(settingBookId(bookId));
        openBookingModal();
    }

    const handleOpenReviews = () => setOpen(prevState => !prevState);

    const isCurrentUserCommentedBook = () =>
        book.comments?.find(review => review.user.commentUserId === user?.id);

    return (
        <div className={styles.selectedBook}>
                <div className={styles.topSide}>
                    <Slider images={book.images}/>
                    <div className={styles.summary}>
                        <p data-test-id='book-title' className={styles.title}>{book.title}</p>
                        <p className={styles.info}>
                            {book.authors && book.authors.map(
                                author => <Fragment key={author}>{author}, </Fragment>
                            )}
                            {book.issueYear}
                        </p>
                        <Button
                            className={styles.selectedBookBtn}
                            name={getBookingMessage(book.booking, book.delivery)}
                            onClick={() => handleOpenBookingModal(book.id.toString())}
                            type={ButtonType.button}
                            disabled={(!!book.booking && book.booking.customerId !== user?.id) ||
                                !!book.delivery?.dateHandedTo}
                            variant={!book.booking && !book.delivery ? ButtonVariant.primary : ButtonVariant.secondary}
                        />
                    </div>
                    <div className={styles.infoBlockAbout}>
                        <p className={styles.infoTitle}>О книге</p>
                        <p className={styles.description}>{book.description}</p>
                    </div>
                </div>
                <div className={styles.bottomSide}>
                    <div className={styles.infoBlockRating}>
                        <p className={styles.infoTitle}>Рейтинг</p>
                        <div className={styles.rating}>
                            <Rating roundedValue={book.rating ? Math.round(book.rating) : 0} />
                            {book.rating
                                ? <span>{book.rating}</span>
                                : <span className={styles.noRating}>еще нет оценок</span>}
                        </div>
                    </div>
                    <div className={styles.infoBlockDetailed}>
                        <p className={styles.infoTitle}>Подробная информация</p>
                        <DetailedInfo book={book}/>
                    </div>
                    <div className={styles.infoBlockReviews}>
                        <div className={styles.infoTitle}>
                            Отзывы
                            <span className={styles.reviewsNum}>{book.comments?.length}</span>
                            {!!book.comments?.length &&
                                <button
                                    data-test-id='button-hide-reviews'
                                    onClick={handleOpenReviews}
                                    className={styles.chevron}
                                    type='button'
                                >
                                    <img className={!open ? styles.chevronClosed : ''} src={chevron} alt="chevron"/>
                                </button>
                            }
                        </div>
                        {!!book.comments?.length &&
                            <Reviews className={!open ? styles.reviewsClosed : ''} reviews={book.comments}/>
                        }
                        <Button
                            className={styles.rateBookButton}
                            name='Оценить книгу'
                            onClick={openReviewModal}
                            type={ButtonType.button}
                            disabled={!!isCurrentUserCommentedBook()}
                        />
                    </div>
                </div>
            </div>
    )
}
