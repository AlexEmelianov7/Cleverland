import React, { FC, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import ratingEmptyStar from '../../../assets/icons/rating-empty-star.svg';
import ratingStar from '../../../assets/icons/rating-star.svg';

import styles from './rating-setting.module.css';

interface RatingSettingProps {
    control: Control<any>
}

export const RatingSetting: FC<RatingSettingProps> = ({control}) => {
    const [rating, setRating] = useState<number>(1);

    const stars = [1, 2, 3, 4, 5];

    return (
        <div>
            {stars.map(value => (
                <label key={value}>
                    <Controller
                        name='rating'
                        control={control}
                        rules={{required: true}}
                        defaultValue={1}
                        render={({field}) => (
                            <input
                                type='radio'
                                value={value}
                                checked={rating === value}
                                onChange={() => {
                                    setRating(value)
                                    field.onChange(value)
                                }}
                            />
                        )}
                     />
                    {value <= rating ? (
                        <img src={ratingStar} alt='rating' />
                    ) : (
                        <img src={ratingEmptyStar} alt='rating' />
                    )}
                </label>
            ))}
        </div>
    );
};
