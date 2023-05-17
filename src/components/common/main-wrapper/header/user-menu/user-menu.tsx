import React, { FC } from 'react';

import styles from './user-menu.module.css';

interface UserMenuProps {
    onLogout: () => void
}

export const UserMenu: FC<UserMenuProps> = ({onLogout}) => (
        <div className={styles.userMenu}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>Профиль</li>
                <li
                    className={styles.menuItem}
                    onClick={onLogout}
                    role='presentation'
                >Выйти
                </li>
            </ul>
        </div>
    );

