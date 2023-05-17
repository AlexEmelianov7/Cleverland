import React, { FC } from 'react';

import { FieldsErrors } from '../../../../types/errors';

import styles from './hint-error.module.css';

interface HintErrorProps {
    errorsArray: string[]
    type: string
    showError: boolean
    dataTestId: string
    fullColoredError?: boolean
}

export const HintError: FC<HintErrorProps> = (
    {
        errorsArray,
        type,
        showError,
        dataTestId,
        fullColoredError
    }) => (
        <React.Fragment>
            {type === 'username' && (
                <p
                    className={`${styles.hint} ${fullColoredError ? styles.fullColored : ''}`}
                    data-test-id={dataTestId}
                >
                    Используйте для логина{' '}
                    <span className={`
                    ${styles.highlight}
                    ${errorsArray.includes(FieldsErrors.latinLetters) && showError ? styles.active : ''}`}>
                        {FieldsErrors.latinLetters}
                    </span>
                    {' '}и{' '}
                    <span className={`
                    ${styles.highlight}
                    ${errorsArray.includes(FieldsErrors.numbers) && showError ? styles.active : ''}`}>
                        {FieldsErrors.numbers}
                    </span>
                </p>
            )}
            {type === 'password' && (
                <p
                    className={`${styles.hint} ${fullColoredError ? styles.fullColored : ''}`}
                    data-test-id={dataTestId}
                >
                    Пароль{' '}
                    <span className={`
                    ${styles.highlight}
                    ${errorsArray.includes(FieldsErrors.minEightCharacters) && showError ? styles.active : ''}`}>
                        {FieldsErrors.minEightCharacters}
                    </span>
                    ,{' '}
                    <span className={`
                    ${styles.highlight}
                    ${errorsArray.includes(FieldsErrors.upperLetter) && showError ? styles.active : ''}`}>
                        {FieldsErrors.upperLetter}
                    </span>
                    {' '}и{' '}
                    <span className={`
                    ${styles.highlight}
                    ${errorsArray.includes(FieldsErrors.number) && showError ? styles.active : ''}`}>
                        {FieldsErrors.number}
                    </span>
                </p>
            )}
        </React.Fragment>
    );
