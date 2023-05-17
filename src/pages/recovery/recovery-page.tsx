import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import navArrow from '../../assets/icons/nav-arrow.svg';
import navArrowGrey from '../../assets/icons/nav-arrow-grey.svg';
import { Routes } from '../../components/app-router/routes';
import { AuthWrapper } from '../../components/common/auth-wrapper/auth-wrapper';
import { Button, ButtonType } from '../../components/common/button/button';
import { Input } from '../../components/common/input/input';
import { Loader } from '../../components/common/loader/loader';
import { ModalWrapper } from '../../components/common/modal-wrapper/modal-wrapper';
import { forgotPasswordSchema, resetPasswordSchema } from '../../form-validation/schema';
import { useErrors } from '../../hooks/use-errors';
import { useAppSelector } from '../../hooks/use-redux';
import {
    forgotPasswordFetching,
    resetPasswordFetching
} from '../../store/password-recovery-slice/password-recovery-slice';
import { IRecoveryFields } from '../../types/authorization';

import styles from './recovery-page.module.css';

export const RecoveryPage = () => {
    const navigate = useNavigate();

    const { search } = useLocation();
    const code = search.split('=')[1];

    const dispatch = useDispatch();
    const { isForgotPassSuccess, isResetPassSuccess,
            error, isLoading} = useAppSelector(state => state.passwordRecovery);

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        formState:{errors}
    } = useForm<IRecoveryFields>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(code ? resetPasswordSchema : forgotPasswordSchema),
        shouldFocusError: false
    })

    const onSubmit: SubmitHandler<IRecoveryFields> = (data) => {
        if (!code) {
            dispatch(forgotPasswordFetching(data))
        }
        if (code) {
            dispatch(
                resetPasswordFetching({
                    code,
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation
                })
            )
        }
        if (code && error) {
            dispatch(
                resetPasswordFetching({
                    code,
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation
                })
            )
        }
    }

    const { errorsArray } = useErrors(resetPasswordSchema,'password', watch('password'));

    return (
        <AuthWrapper>
            {!code && !isForgotPassSuccess && !isResetPassSuccess && (
                <ModalWrapper>
                    <div className={styles.topNavBlock}>
                        <Link to={Routes.auth}>
                            <img src={navArrowGrey} alt='arrow' />
                        </Link>
                        Вход в личный кабинет
                    </div>
                    <h1 className={styles.title}>Восстановление пароля</h1>
                    <form onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
                        <div className={styles.inputs}>
                            <Input
                                label='email'
                                placeholder='E-mail'
                                type='email'
                                register={register('email')}
                                watch={watch('email')}
                                error={errors.email}
                                clearErrors={clearErrors}
                            />
                            {error && (
                                <p className={styles.hintError} data-test-id='hint'>{error}</p>
                            )}
                            <p className={styles.hint}>
                                На это email будет отправлено письмо с инструкциями по восстановлению пароля
                            </p>
                        </div>
                        <Button
                            className={styles.button}
                            name='Восстановить'
                            onClick={() => onSubmit}
                            type={ButtonType.submit}
                        />
                    </form>
                    <div className={styles.navBlock}>
                        <p className={styles.navText}>Нет учетной записи?</p>
                        <Link className={styles.navLink} to={Routes.registration}>
                            Регистрация
                            <img src={navArrow} alt='arrow' />
                        </Link>
                    </div>
                </ModalWrapper>
            )}
            {isForgotPassSuccess && !code && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Письмо выслано</h1>
                    <p className={styles.centeredDescr}>
                        Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
                    </p>
                </ModalWrapper>
            )}
            {code && !isResetPassSuccess && !error && (
                <ModalWrapper dataTestId='reset-password-form'>
                    <h1 className={styles.title}>Восстановление пароля</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputs}>
                            <Input
                                label='password'
                                placeholder='Новый пароль'
                                type='password'
                                register={register('password')}
                                watch={watch('password')}
                                error={errors.password}
                                errors={errorsArray}
                                clearErrors={clearErrors}
                            />
                            <Input
                                label='passwordConfirmation'
                                placeholder='Повторите пароль'
                                type='password'
                                register={register('passwordConfirmation')}
                                watch={watch('passwordConfirmation')}
                                error={errors.passwordConfirmation}
                                clearErrors={clearErrors}
                            />
                        </div>
                        <Button
                            className={styles.button}
                            name='Сохранить изменения'
                            onClick={() => onSubmit}
                            type={ButtonType.submit}
                            disabled={!!errors.passwordConfirmation}
                        />
                    </form>
                    <p className={styles.description}>
                        После сохранения войдите в библиотеку, используя новый пароль
                    </p>
                </ModalWrapper>
            )}
            {isResetPassSuccess && code && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Новые данные сохранены</h1>
                    <p className={styles.centeredDescr}>
                        Зайдите в личный кабинет, используя свои логин и новый пароль
                    </p>
                    <Button
                        className={styles.button}
                        name='Вход'
                        onClick={() => navigate(Routes.auth)}
                        type={ButtonType.button}
                    />
                </ModalWrapper>
            )}
            {error && code && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Данные не сохранились</h1>
                    <p className={styles.centeredDescr}>{error}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button
                            className={styles.button}
                            name='Повторить'
                            onClick={() => onSubmit}
                            type={ButtonType.submit}
                        />
                    </form>
                </ModalWrapper>
            )}
            {isLoading && (
                <Loader/>
            )}
        </AuthWrapper>
    );
};
