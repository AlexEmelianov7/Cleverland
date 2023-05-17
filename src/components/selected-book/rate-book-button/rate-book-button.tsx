import React, {FC} from 'react';

import {ButtonVariant} from '../../common/button/button';

import button from '../../common/button/button.module.css';

interface RateBookButtonProps {
    variant?: ButtonVariant
    className?: string
}

export const RateBookButton: FC<RateBookButtonProps> = (
    {
        variant= ButtonVariant.primary,
        className
    }) => (
        <button
            data-test-id='button-rating'
            type='button'
            className={`
                ${className}
                ${button.button}
                ${variant === ButtonVariant.primary ? button.primary : ''}
                `}
        >
            Оценить книгу
        </button>
    );
