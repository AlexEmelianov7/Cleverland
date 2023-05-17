import React, {MouseEventHandler, useEffect, useState} from 'react';

import {useScreenWidth} from '../../../../../context/screen-width-context';
import { useAppDispatch } from '../../../../../hooks/use-redux';
import { logout } from '../../../../../store/auth/auth-slice';
import {AsideNav} from '../../../../aside-nav/aside-nav';
import {NavTab} from '../../../../aside-nav/nav-tab/nav-tab';

import styles from './header-burger.module.css';

export const HeaderBurger = () => {
    const dispatch = useAppDispatch();

    const { screenWidth } = useScreenWidth();

    const [open, setOpen] = useState<boolean>(false);
    const handleToggleBurgerMenu = () => setOpen(prevState => !prevState);
    const handleCloseBurgerMenu = () => setOpen(false);

    const handleClickAway: MouseEventHandler = (event) => {
        if (event.target === event.currentTarget) {
            handleToggleBurgerMenu();
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        dispatch(logout());
        handleCloseBurgerMenu();
    }

    useEffect(() => {
        if (open && screenWidth < 957) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open, screenWidth])

    return (
        <React.Fragment>
            <div
                data-test-id='button-burger'
                className={styles.headerBurgerWrapper}
                onClick={handleToggleBurgerMenu}
                role='presentation'
            >
                <div className={`${open ? styles.active : styles.headerBurger}`}>
                    <span />
                </div>
            </div>
            <div
                className={open ? styles.background : ''}
                onClick={handleClickAway}
                data-test-id='burger-navigation'
                role='presentation'
            >
                <div className={open ? styles.burgerMenuActive : styles.burgerMenuClosed}>
                    <div className={styles.burgerMenuTop}>
                         <AsideNav
                            showcase='burger-showcase'
                            terms='burger-terms'
                            contract='burger-contract'
                            dataTestIdCategories='burger'
                            dataTestIdCount='burger-book-count-for'
                            onClick={handleCloseBurgerMenu}
                         />
                    </div>
                    <div className={styles.burgerMenuBottom}>
                        <div className={styles.bottomTabs}>
                            <NavTab
                                name='Профиль'
                                path="/"
                            />
                            <NavTab
                                dataTestId='exit-button'
                                onClick={handleLogout}
                                name='Выход'
                                path="/"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
