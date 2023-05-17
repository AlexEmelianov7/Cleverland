import React, {FC} from 'react';

import {IBookReview} from '../../../types/books';

import {Review} from './review/review';

import styles from './reviews.module.css';

interface ReviewsProps {
    reviews: IBookReview[] | null
    className?: string
}

export const Reviews: FC<ReviewsProps> = ({reviews, className}) => (
        <div className={`${styles.reviews} ${className}`}>
            {reviews && reviews.map((review) =>
                <Review {...review} key={review.id}/>
            )}
        </div>
    );
