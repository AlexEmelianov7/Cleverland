import React, {
    FC,
    MouseEventHandler, useEffect, useRef, useState,
} from 'react';

import {useScreenWidth} from '../../../context/screen-width-context';
import {WithChildren} from '../../../types/with-children';

import styles from './search-input.module.css';

interface SearchInputProps {
    query: string
    onClick: MouseEventHandler<HTMLButtonElement>
    queryChange: (value: string) => void
    autofocus: boolean
    formClass: string
    searchBtnClass: string
    searchInputClass: string
}

export const SearchInput: FC<SearchInputProps & WithChildren> = (
    {
        query= '',
        onClick,
        queryChange,
        autofocus = false,
        formClass= '',
        searchBtnClass = '',
        searchInputClass = '',
        children
    }) => {

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const { screenWidth } = useScreenWidth();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!autofocus) {
            return
        }

        if (inputRef.current && screenWidth <= 670) {
            inputRef.current.focus()
        }
    }, [autofocus, screenWidth])


    return (
        <div className={`${formClass} ${styles.searchInputWrapper}`}>
            <button
                data-test-id='button-search-open'
                type='button'
                className={`${searchBtnClass} ${styles.searchButton}`}
                onClick={onClick}
            >
                <svg className={isFocus ? styles.activeSearchIcon : ''} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.3335 2.66683C4.75617 2.66683 2.66683 4.75617 2.66683 7.3335C2.66683 9.91083 4.75617 12.0002 7.3335 12.0002C9.91083 12.0002 12.0002 9.91083 12.0002 7.3335C12.0002 4.75617 9.91083 2.66683 7.3335 2.66683ZM1.3335 7.3335C1.3335 4.01979 4.01979 1.3335 7.3335 1.3335C10.6472 1.3335 13.3335 4.01979 13.3335 7.3335C13.3335 10.6472 10.6472 13.3335 7.3335 13.3335C4.01979 13.3335 1.3335 10.6472 1.3335 7.3335Z" fill="#A7A7A7"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6284 10.6284C10.8887 10.368 11.3108 10.368 11.5712 10.6284L14.4712 13.5284C14.7315 13.7887 14.7315 14.2108 14.4712 14.4712C14.2108 14.7315 13.7887 14.7315 13.5284 14.4712L10.6284 11.5712C10.368 11.3108 10.368 10.8887 10.6284 10.6284Z" fill="#A7A7A7"/>
                </svg>
            </button>
            <input
                data-test-id='input-search'
                id='search'
                value={query}
                onChange={event => queryChange(event.target.value)}
                name='searchInput'
                placeholder='Поиск книги или автора…'
                className={`${searchInputClass} ${styles.searchInput}`}
                onBlur={() => setIsFocus(false)}
                onFocus={() => setIsFocus(true)}
                ref={inputRef}
            />
            {children}
        </div>
    );
}
