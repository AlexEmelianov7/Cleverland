import {FC, useMemo} from 'react';

import {useAppSelector} from '../../../hooks/use-redux';
import {WithClassname} from '../../../types/with-classname';
import {makeNavCategories} from '../../../utils/make-nav-categories';

import {BookGenre} from './book-genre/book-genre';

import styles from './book-menu.module.css';

interface BookMenuProps {
    onClick?: () => void
    dataTestIdCategories?: string
    dataTestIdCount?: string
}

export const BookMenu: FC<BookMenuProps & WithClassname> = (
    {
        onClick,
        dataTestIdCategories,
        dataTestIdCount,
        className
    }) => {

    const { categories, books } = useAppSelector(state => state.books)

    const navCategories = useMemo(
        () => books && categories && makeNavCategories(books, categories),
        [books, categories]
    )

    return (

        <ul className={`${className} ${styles.bookMenu}`}>
            {navCategories &&
                navCategories.map(category =>
                <BookGenre
                    dataTestIdCategories={dataTestIdCategories}
                    dataTestIdCount={dataTestIdCount}
                    key={category.id}
                    count={category.count}
                    id={category.id}
                    name={category.name}
                    path={category.path}
                    onClick={onClick}
                />
            )}
        </ul>
    );
}

