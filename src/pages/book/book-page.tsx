import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import { Calendar } from '../../components/calendar/calendar';
import {Loader} from '../../components/common/loader/loader';
import { ModalWrapper } from '../../components/common/modal-wrapper/modal-wrapper';
import { Overlay } from '../../components/common/overlay/overlay';
import {Toast} from '../../components/common/toast/toast';
import { ReviewForm } from '../../components/review-form/review-form';
import {Breadcrumbs} from '../../components/selected-book/breadcrumbs/breadcrumbs';
import {SelectedBook} from '../../components/selected-book/selected-book';
import {useAppDispatch, useAppSelector} from '../../hooks/use-redux';
import {bookDetailedFetching} from '../../store/book-detailed/book-detailed-slice';
import {booksFetchingError} from '../../store/books/books-slice';

import styles from './book-page.module.css';

export const BookPage: FC = () => {
    const { id } = useParams();

    const [openReviewModal, setOpenReviewModal] = useState(false);

    const [openBookingModal, setOpenBookingModal] = useState(false);

    const { book, isLoading, error } = useAppSelector(state => state.bookDetailed);
    const {
        review,
        isLoading: isLoadingReview,
        error: errorReview
    } = useAppSelector(state => state.review);

    const { isLoading: isLoadingBooking } = useAppSelector(state => state.booking);

    const dispatch = useAppDispatch();

    const handleOpenReviewModal = () => setOpenReviewModal(true);
    const handleCloseReviewModal = () => setOpenReviewModal(false);

    const handleOpenBookingModal = () => setOpenBookingModal(true);
    const handleCloseBookingModal = () => setOpenBookingModal(false);

    const handleClickAway: MouseEventHandler = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseReviewModal();
            handleCloseBookingModal();
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(bookDetailedFetching(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (review || errorReview) {
            handleCloseReviewModal()
        }
    }, [errorReview, review])

    return (
        <section className={styles.bookPage}>
            <Breadcrumbs />
            {book && (
                <SelectedBook
                    book={book}
                    openReviewModal={handleOpenReviewModal}
                    openBookingModal={handleOpenBookingModal}
                />
            )}
            {openReviewModal && (
                <Overlay onClose={handleClickAway}>
                    <ModalWrapper>
                        <ReviewForm onClose={handleCloseReviewModal}/>
                    </ModalWrapper>
                </Overlay>
            )}
            {error && (
                <Toast message={error} onClose={() => dispatch(booksFetchingError(null))}/>
            )}
            {(isLoading || isLoadingReview || isLoadingBooking) && (
                <Loader />
            )}
            {openBookingModal && (
                <Overlay onClose={handleClickAway}>
                    <ModalWrapper>
                        <Calendar onClose={handleCloseBookingModal} />
                    </ModalWrapper>
                </Overlay>
            )}
        </section>
    )
};
