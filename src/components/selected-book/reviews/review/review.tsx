import React from 'react';

import userAvatar from '../../../../assets/img/avatar-review.jpg';
import {API_URL} from '../../../../books_api/books-api';
import {IBookReview} from '../../../../types/books';
import { convertDate } from '../../../../utils/dayjs';
import {Rating} from '../../../common/rating/rating';

import styles from './review.module.css';

export const Review = ({user, createdAt, rating, text}: IBookReview) => (
        <div className={styles.review}>
            <div className={styles.userBlock}>
                <img src={user.avatarUrl ? `${API_URL}${user.avatarUrl}` : userAvatar} alt='avatar' />
                <div className={styles.userInfoBlock}>
                    <span className={styles.userInfo}>{`${user.firstName} ${user.lastName}`}</span>
                    <span className={styles.userInfo}>{convertDate(createdAt, 'DD MMMM YYYY года')}</span>
                </div>
            </div>
            <div className={styles.rating}>
                <Rating roundedValue={rating ? rating : 0} />
            </div>
            {!!text && <p className={styles.text}>{text}</p>}
        </div>
    );
