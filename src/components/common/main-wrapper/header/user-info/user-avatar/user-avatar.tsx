import React, {FC} from 'react';

import styles from './user-avatar.module.css';

interface UserAvatarProps {
    avatarUrl: string
    userName?: string
}
export const UserAvatar: FC<UserAvatarProps> = ({userName= '', avatarUrl= ''}) => (
        <div className={styles.userAvatar}>
            {avatarUrl ? <img src={avatarUrl} alt="avatar"/> : <p>{userName.toUpperCase()[0]}</p>}
        </div>
    );
