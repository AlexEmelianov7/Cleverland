import React, {FC} from 'react';
import {Link, useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../../hooks/use-redux';
import {
    booksWithCategoriesFetching
} from '../../../store/books/books-slice';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs: FC = () => {
    const dispatch = useAppDispatch();

    const { id, category } = useParams();
    const { book } = useAppSelector(state => state.bookDetailed);
    const { categories } = useAppSelector(state => state.books);

    const categoryName = categories?.find(({path}) => path === category)?.name

    return (
        <div className={styles.breadcrumbsWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.breadcrumbs}>
                    <Link to={`/books/${categoryName ? category : 'all'}`}
                          className={styles.crumb}
                          data-test-id='breadcrumbs-link'
                          onClick={() => dispatch(booksWithCategoriesFetching())}
                    >
                        {categoryName ? categoryName : 'Все книги'}
                    </Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 21L16 3" stroke="#BFC4C9" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <Link
                        className={styles.crumb}
                        to={`/books/${category}/${id}`}
                        data-test-id='book-name'
                    >
                        {book?.title}
                    </Link>
                </div>
            </div>
        </div>
    );
}
