import React, {FC} from 'react';

import {WithClassname} from '../../../types/with-classname';

import styles from './button.module.css';

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary'
}

export enum ButtonType {
    button = 'button',
    submit = 'submit'
}

export interface ButtonProps {
    name: string
    onClick: () => void
    type?: ButtonType
    variant?: ButtonVariant
    disabled?: boolean
}
export const Button: FC<ButtonProps & WithClassname> = (
    {
        name= '',
        variant = ButtonVariant.primary,
        type= ButtonType.button,
        onClick,
        className= '',
        disabled= false
    }) => (
        <button
            disabled={disabled}
            onClick={event => {
                if (type === ButtonType.button) {
                    event.preventDefault()
                }
                onClick()
            }}
            className={`
                ${className}
                ${styles.button}
                ${variant === ButtonVariant.primary ? styles.primary : styles.secondary}
            `}
            type={type === ButtonType.button ? 'button' : 'submit'}
        >
            {name}
        </button>
    );
