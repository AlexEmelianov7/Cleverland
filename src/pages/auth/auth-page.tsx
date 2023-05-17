import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import navArrow from '../../assets/icons/nav-arrow.svg';
import { Routes } from '../../components/app-router/routes';
import { AuthWrapper } from '../../components/common/auth-wrapper/auth-wrapper';
import { Button, ButtonType } from '../../components/common/button/button';
import { Input } from '../../components/common/input/input';
import { Loader } from '../../components/common/loader/loader';
import { ModalWrapper } from '../../components/common/modal-wrapper/modal-wrapper';
import { authScheme } from '../../form-validation/schema';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { authFetching } from '../../store/auth/auth-slice';
import { IAuthFields } from '../../types/authorization';
import { AuthErrors } from '../../types/errors';

import styles from './auth-page.module.css';

export const AuthPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {user, error, isLoading} = useAppSelector(state => state.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IAuthFields>({
        mode: 'all',
        resolver: yupResolver(authScheme)
    })

    const onSubmit: SubmitHandler<IAuthFields> = (data) => {
        if (user) {
            navigate(Routes.bookAll)
        }
        dispatch(authFetching(data));
    }

    return (
        <AuthWrapper>
            {!user && error !== AuthErrors.smthWrong && (
                <ModalWrapper>
                    <h1 className={styles.title}>Вход в личный кабинет</h1>
                    <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
                        <div className={styles.inputs}>
                            <Input
                                label='identifier'
                                placeholder='Логин'
                                type='text'
                                register={register('identifier')}
                                watch={watch('identifier')}
                                error={errors.identifier}
                                withoutError={!errors.identifier}
                            />
                            <Input
                                label='password'
                                placeholder='Пароль'
                                type='password'
                                register={register('password')}
                                watch={watch('password')}
                                error={errors.password}
                                withoutError={!errors.password}
                            />
                            <p
                                className={`
                                    ${styles.error}
                                    ${error === AuthErrors.wrongInfo ? styles.errorVisible : ''}
                                `}
                                data-test-id='hint'
                            >
                                {AuthErrors.wrongInfo}
                            </p>
                            <Link className={styles.formLink} to={Routes.recovery}>
                                {error === AuthErrors.wrongInfo ? 'Восстановить?' : 'Забыли логин или пароль?'}
                            </Link>
                        </div>
                        <Button
                            className={styles.button}
                            name='Вход'
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
            {error === AuthErrors.smthWrong && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Вход не выполнен</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className={styles.description}>{AuthErrors.smthWrong}</p>
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
