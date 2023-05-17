import React, {FC} from 'react';

import {UserAvatar} from './user-avatar/user-avatar';

import styles from './user-info.module.css';

interface UserInfoProps {
    avatarUrl: string
    userName?: string
    onClick?: () => void
}

export const UserInfo: FC<UserInfoProps> = (
    {userName = '', avatarUrl = '', onClick}) => (
        <div className={styles.userInfo} onClick={onClick} role='presentation'>
            <p className={styles.userGreeting}>{`Привет, ${userName}!`}</p>
            <UserAvatar userName={userName} avatarUrl={avatarUrl}/>
        </div>
    );
