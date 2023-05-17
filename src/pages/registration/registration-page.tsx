import React, { useState } from 'react';
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
import { passwordSchema, usernameSchema } from '../../form-validation/schema';
import { useErrors } from '../../hooks/use-errors';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import {
    clearingRegistrationData,
    registrationFetching
} from '../../store/registration/registration-slice';
import { IRegistrationFields } from '../../types/authorization';
import { RegistrationErrors } from '../../types/errors';
import { getRegisterBtnName } from '../../utils/get-register-btn-name';
import { selectRegistrationSchema } from '../../utils/select-registration-schema';

import styles from './registration-page.module.css';

export const RegistrationPage = () => {
    const [registrationStep, setRegistrationStep] = useState(1);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { isSuccess, isLoading, error } = useAppSelector(state => state.registration);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        formState: {errors},
    } = useForm<IRegistrationFields>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(selectRegistrationSchema(registrationStep)),
        shouldFocusError: false
    })

    const onSubmit: SubmitHandler<IRegistrationFields> = (data) => {
        if (registrationStep < 3) {
            setRegistrationStep(prevStep => prevStep + 1)
        }
        if (registrationStep === 3 && !isSuccess && !error) {
            dispatch(registrationFetching(data))
        }
        if (isSuccess) {
            dispatch(clearingRegistrationData())
            navigate(Routes.auth)
        }
        if (error) {
            dispatch(clearingRegistrationData())
            reset()
            setRegistrationStep(1)
        }
    }

    const { errorsArray: errorsPassword } = useErrors(passwordSchema, 'password', watch('password'));
    const { errorsArray: errorsUsername } = useErrors(usernameSchema, 'username', watch('username'));

    const disabled =
        !!errors.username || !!errors.password || !!errors.firstName
        || !!errors.lastName || !!errors.phone || !!errors.email

    return (
        <AuthWrapper>
            {!isSuccess && !error && (
                <ModalWrapper>
                    <h1 className={styles.title}>Регистрация</h1>
                    <p className={styles.step}>{registrationStep} шаг из 3</p>
                    <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                        <div className={styles.inputs}>
                            {registrationStep === 1 && (
                                <React.Fragment>
                                    <Input
                                        label='username'
                                        placeholder='Придумайте логин для входа'
                                        type='text'
                                        register={register('username')}
                                        watch={watch('username')}
                                        error={errors.username}
                                        errors={errorsUsername}
                                        fullColoredError={!!errors.username}
                                        clearErrors={clearErrors}
                                    />
                                    <Input
                                        label='password'
                                        placeholder='Пароль'
                                        type='password'
                                        register={register('password')}
                                        watch={watch('password')}
                                        error={errors.password}
                                        errors={errorsPassword}
                                        fullColoredError={!!errors.password}
                                        clearErrors={clearErrors}
                                    />
                                </React.Fragment>
                            )}
                            {registrationStep === 2 && (
                                <React.Fragment>
                                    <Input
                                        label='firstName'
                                        placeholder='Имя'
                                        type='text'
                                        register={register('firstName')}
                                        watch={watch('firstName')}
                                        error={errors.firstName}
                                        clearErrors={clearErrors}
                                    />
                                    <Input
                                        label='lastName'
                                        placeholder='Фамилия'
                                        type='text'
                                        register={register('lastName')}
                                        watch={watch('lastName')}
                                        error={errors.lastName}
                                        clearErrors={clearErrors}
                                    />
                                </React.Fragment>
                            )}
                            {registrationStep === 3 && (
                                <React.Fragment>
                                    <Input
                                        label='phone'
                                        placeholder='Номер телефона'
                                        type='text'
                                        register={register('phone')}
                                        watch={watch('phone')}
                                        error={errors.phone}
                                        clearErrors={clearErrors}
                                        mask='+375 (99) 999-99-99'
                                        placeholderMask='x'
                                        hintMessage='В формате +375 (xx) xxx-xx-xx'
                                    />
                                    <Input
                                        label='email'
                                        placeholder='E-mail'
                                        type='email'
                                        register={register('email')}
                                        watch={watch('email')}
                                        error={errors.email}
                                        clearErrors={clearErrors}
                                    />
                                </React.Fragment>
                            )}
                        </div>
                        <Button
                            className={styles.button}
                            name={getRegisterBtnName(registrationStep)}
                            onClick={() => onSubmit}
                            type={ButtonType.submit}
                            disabled={disabled}
                        />
                    </form>
                    <div className={styles.navBlock}>
                        <p className={styles.navText}>Есть учётная запись?</p>
                        <Link className={styles.navLink} to={Routes.auth}>
                            Войти
                            <img src={navArrow} alt='arrow' />
                        </Link>
                    </div>
                </ModalWrapper>
            )}
            {isSuccess && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Регистрация успешна</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className={styles.description}>
                            Регистрация прошла успешно.
                            Зайдите в личный кабинет, используя свои логин и пароль
                        </p>
                        <Button
                            className={styles.button}
                            name='Вход'
                            onClick={() => onSubmit}
                            type={ButtonType.submit}
                        />
                    </form>
                </ModalWrapper>
            )}
            {error && (
                <ModalWrapper dataTestId='status-block'>
                    <h1 className={`${styles.title} ${styles.centered}`}>Данные не сохранились</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className={styles.description}>
                            {error === RegistrationErrors.smthWrong
                                ? RegistrationErrors.smthWrong
                                : RegistrationErrors.notUniqueInfo
                            }
                        </p>
                        <Button
                            className={styles.button}
                            name={
                                error === RegistrationErrors.smthWrong
                                ? 'Повторить'
                                : 'Назад к регистрации'
                            }
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
