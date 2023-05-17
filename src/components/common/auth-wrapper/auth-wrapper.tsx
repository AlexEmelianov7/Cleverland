import React, { FC } from 'react';

import { WithChildren } from '../../../types/with-children';

import styles from './auth-wrapper.module.css';

export const AuthWrapper: FC<WithChildren> = ({children}) => (
        <div className={styles.authWrapper} data-test-id='auth'>
            <h1 className={styles.title}>Cleverland</h1>
            {children}
        </div>
    );
