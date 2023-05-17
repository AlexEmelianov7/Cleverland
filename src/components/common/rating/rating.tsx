import React, {FC} from 'react';

import styles from './rating.module.css';
import ratingStar from '../../../assets/icons/rating-star.svg';
import ratingEmptyStar from '../../../assets/icons/rating-empty-star.svg';


interface RatingProps {
    roundedValue: number
}

export const Rating: FC<RatingProps> = ({roundedValue}) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={styles.rating}>
            {stars.map(star => (
                <div
                    className={styles.star}
                    key={star}
                >
                    {roundedValue < star ? (
                        <img src={ratingEmptyStar} alt="rating"/>
                    ) : (
                        <img src={ratingStar} alt="rating"/>
                    )}
                </div>
            ))}
        </div>
    );
};
