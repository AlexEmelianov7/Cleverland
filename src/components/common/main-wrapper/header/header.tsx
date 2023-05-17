import React, { MouseEventHandler, useState } from 'react';
import {Link} from 'react-router-dom';

import logo from '../../../../assets/icons/logo.svg';
import avatar from '../../../../assets/img/avatar.jpg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/use-redux';
import { logout } from '../../../../store/auth/auth-slice';

import {HeaderBurger} from './header-burger/header-burger';
import {UserInfo} from './user-info/user-info';
import { UserMenu } from './user-menu/user-menu';

import styles from './header.module.css';

export const Header = () => {
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    const handleToggleUserMenu = () => setOpen(prevState => !prevState);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        dispatch(logout());
        handleToggleUserMenu();
    }

    const handleClickAway: MouseEventHandler = (event) => {
        if (event.target === event.currentTarget) {
            handleToggleUserMenu();
        }
    }

    return (
        <React.Fragment>
            <header className={`${styles.header} ${open ? styles.bordered : ''}`}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <Link to='books/all' className={styles.logo}>
                            <img src={logo} alt="logo"/>
                        </Link>
                        <HeaderBurger/>
                        <h1 className={styles.title}>Библиотека</h1>
                    </div>
                    <UserInfo onClick={handleToggleUserMenu} userName={user?.firstName} avatarUrl={avatar}/>
                    {open && <UserMenu onLogout={handleLogout}/>}
                </div>
            </header>
            <div onClick={handleClickAway} className={open ? styles.overlay : ''} role='presentation'/>
        </React.Fragment>
    );
}
