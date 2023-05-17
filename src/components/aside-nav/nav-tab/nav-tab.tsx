import React, {FC, MouseEventHandler} from 'react';
import {Link, PathMatch} from 'react-router-dom';

import {WithChildren} from '../../../types/with-children';

import styles from './nav-tab.module.css';

interface NavTabProps {
    name: string
    path: string
    page?: PathMatch | null
    onClick?: MouseEventHandler<HTMLLIElement>
    dataTestId?: string
}

export const NavTab: FC<NavTabProps & WithChildren> = (
    {
        name = '',
        path= '',
        onClick,
        page,
        children,
        dataTestId
    }) => (
        <li
            data-test-id={dataTestId}
            onClick={onClick}
            className={`${styles.navTab} ${page ? styles.active : ''}`}
            role='presentation'
        >
            <Link to={path}>
                {name}
                {children}
            </Link>
        </li>
    )
