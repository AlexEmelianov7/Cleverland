import React, {
    FC,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    MouseEventHandler,
    useState
} from 'react';
import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import InputMask from 'react-input-mask';

import check from '../../../assets/icons/check.svg';
import closeEye from '../../../assets/icons/close-eye.svg';
import openEye from '../../../assets/icons/open-eye.svg';

import { HintError } from './hint-error/hint-error';

import styles from './input.module.css';

interface InputProps {
    label: string
    placeholder: string
    type: HTMLInputTypeAttribute
    register: UseFormRegisterReturn
    watch: string
    withoutError?: boolean
    error?: FieldError
    errors?: string[]
    clearErrors?: UseFormClearErrors<any>
    fullColoredError?: boolean
    hintMessage?: string
    mask?: string
    placeholderMask?: string
}

export const Input: FC<InputProps> = (
    {
        label,
        placeholder,
        type,
        register,
        watch,
        withoutError = false,
        error,
        errors,
        clearErrors,
        fullColoredError,
        hintMessage,
        mask,
        placeholderMask
    }) => {

    const [isFocus, setIsFocus] = useState(false);

    const handleOnFocus = () => {
        if (clearErrors) {
            clearErrors()
        }
        setIsFocus(true)
    }
    const handleOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        setIsFocus(false);
        if (register.onBlur) {
            register.onBlur(event)
        }
    }

    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword: MouseEventHandler<HTMLImageElement> = (event) => {
        event.preventDefault();
        setIsShowPassword(prevState => !prevState);
    }

    const isPasswordInput = label === 'password' && watch && !errors?.length && !error?.message;

    const isPasswordOrConfirmPasswordInput =
        (label === 'password' || label === 'passwordConfirmation') && watch;

    const isWithErrorsAndErrorRequired =
        errors && error?.message && error.type === 'required' && label !== 'phone' && !hintMessage;

    const isWithoutErrors = !errors && error?.message && label !== 'phone' && !hintMessage;

    return (
        <label className={styles.label}>
            {mask ? (
                <InputMask
                    className={`${styles.input} ${error?.message ? styles.inputError : ''}`}
                    mask={mask}
                    maskChar={placeholderMask}
                    type={isShowPassword ? 'text' : type}
                    {...register}
                    alwaysShowMask={label !== 'phone' && !watch && !error?.message}
                    onFocus={() => clearErrors && clearErrors()}
                />
            ) : (
                <input
                    className={`${styles.input} ${error?.message ? styles.inputError : ''}`}
                    {...register}
                    type={isShowPassword ? 'text' : type}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            )}
            <span className={`${styles.placeholder} ${watch ? styles.fixed : ''}`}>{placeholder}</span>
            {isPasswordInput && (
                <img
                    className={styles.checkIcon}
                    src={check}
                    alt='check'
                    data-test-id='checkmark'
                />
            )}
            {isPasswordOrConfirmPasswordInput && (
                <img
                    src={isShowPassword ? openEye : closeEye}
                    className={styles.eyeIcon}
                    alt='eye'
                    onClick={toggleShowPassword}
                    role='presentation'
                    data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
                />
            )}
            {errors && error?.type !== 'required' && (
                <HintError
                    dataTestId='hint'
                    errorsArray={errors}
                    type={label}
                    showError={!!watch}
                    fullColoredError={fullColoredError}
                />
            )}
            {isWithErrorsAndErrorRequired && (
                <p
                    className={`
                        ${styles.error}
                        ${error?.message ? styles.errorVisible : ''}
                        ${withoutError ? styles.errorHide : ''}
                    `}
                    data-test-id='hint'
                >
                    {error?.message}
                </p>
            )}
            {isWithoutErrors && (
                <p
                    className={`
                        ${styles.error}
                        ${error?.message ? styles.errorVisible : ''}
                        ${withoutError ? styles.errorHide : ''}
                    `}
                   data-test-id='hint'
                >
                    {error?.message}
                </p>
            )}
            {label === 'phone' && (
                <p
                    className={`
                        ${styles.errorPhone}
                        ${error?.message ? styles.errorPhoneVisible : ''}
                        ${withoutError ? styles.errorHide : ''}
                    `}
                    data-test-id='hint'
                >
                    {error?.message ? error.message : hintMessage}
                </p>
            )}
        </label>
    );
};
