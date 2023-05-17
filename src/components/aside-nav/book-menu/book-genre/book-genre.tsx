import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {useScreenWidth} from '../../../../context/screen-width-context';
import {IBookCategoryWithCount} from '../../../../types/book-categories';

import styles from './book-genre.module.css';

interface BookGenreProps {
    onClick?: () => void
    dataTestIdCategories?: string
    dataTestIdCount?: string
}

export const BookGenre: FC<BookGenreProps & IBookCategoryWithCount> = (
    {
        path,
        name,
        count,
        id,
        onClick,
        dataTestIdCategories,
        dataTestIdCount
    }) => {

    const { screenWidth } = useScreenWidth();

    return (
        <li
            className={`${styles.genre}`}
            onClick={onClick}
            role='presentation'
        >
            <NavLink
                to={`/books/${path}`}
                className={({isActive}) =>`${isActive ? styles.active : ''}`}
                data-test-id={(id === 0 ? screenWidth > 956 ? `${dataTestIdCategories}-books` : `${dataTestIdCategories}-books` : screenWidth >= 957 ? `${dataTestIdCategories}-${path}` : `${dataTestIdCategories}-${path}`)}
            >
                {name}
            </NavLink>
            <span
                data-test-id={screenWidth > 956 ? `${dataTestIdCount}-${path}` : `${dataTestIdCount}-${path}`}
                className={`${styles.count}`}
            >
                {count}
            </span>
        </li>
    );
}
