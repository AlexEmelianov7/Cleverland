import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import closeIcon from '../../assets/icons/modal-close.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { reviewFetching } from '../../store/review/review-slice';
import { FieldsErrors } from '../../types/errors';
import { IReviewFields } from '../../types/review';
import { Button, ButtonType } from '../common/button/button';

import { RatingSetting } from './rating-setting/rating-setting';

import styles from './review-form.module.css';

interface ReviewFormProps {
    onClose: () => void
}

export const ReviewForm: FC<ReviewFormProps> = ({onClose}) => {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const {
        register,
        control,
        handleSubmit
    } = useForm<IReviewFields>({ defaultValues: {rating: 1} });

    const onSubmit: SubmitHandler<IReviewFields> = (data) => {
        if (user && id) {
            dispatch(reviewFetching({...data, user: user.id.toString(), book: id}))
        }
    }

    return (
        <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>Оцените книгу</h2>
            <img
                className={styles.closeIcon}
                onClick={onClose}
                src={closeIcon}
                alt='close'
                role='presentation'
            />
            <p className={styles.subTitle}>Ваша оценка</p>
            <RatingSetting control={control}/>
            <textarea
                className={styles.textarea}
                {...register('text', {required: FieldsErrors.required})}
                placeholder='Оставить отзыв'
            />
            <Button
                name='Оценить'
                type={ButtonType.submit}
                onClick={() => onSubmit}
            />
        </form>
    );
};
