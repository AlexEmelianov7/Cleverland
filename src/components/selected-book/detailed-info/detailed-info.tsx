import React, {FC} from 'react';

import {IBookDetailed} from '../../../types/books';

import styles from './detailed-info.module.css';

interface DetailedInfoProps {
    book: IBookDetailed
}
export const DetailedInfo: FC<DetailedInfoProps> = ({book}) => {
    const configInfo = [
        {
            title: 'Издательство',
            value: book.publish,
            condition: book.publish,
        },
        {
            title: 'Год издания',
            value: book.issueYear,
            condition: book.issueYear,
        },
        {
            title: 'Страниц',
            value: book.pages,
            condition: book.pages,
        },
        {
            title: 'Переплёт',
            value: book.cover,
            condition: book.cover,
        },
        {
            title: 'Формат',
            value: book.format,
            condition: book.format,
        }
    ];

    const configInfoSecond = [
        {
            title: 'Жанр',
            value: book.categories,
            condition: book.categories
        },
        {
            title: 'Вес',
            value: book.weight,
            condition: book.weight
        },
        {
            title: 'ISBN',
            value: book.ISBN,
            condition: book.ISBN
        },
        {
            title: 'Изготовитель',
            value: book.producer,
            condition: book.producer,
        }
    ]

    return (
        <div className={styles.detailedInfoWrapper}>
            <div className={styles.detailedInfoLeft}>
                {configInfo.map((item ) =>
                        item.condition && (
                            <div className={styles.element} key={item.title}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.value}>{item.value}</p>
                            </div>
                        )
                )}
            </div>
            <div className={styles.detailedInfoRight}>
                {configInfoSecond.map((item ) =>
                        item.condition && (
                            <div className={styles.element} key={item.title}>
                                <p className={styles.title}>{item.title}</p>
                                <p className={styles.value}>{item.value}</p>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};
