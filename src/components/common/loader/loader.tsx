import React, {FC} from 'react';

import loaderIcon from '../../../assets/icons/loader.svg';

import styles from './loader.module.css';

export const Loader: FC = () => (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader} data-test-id='loader'>
                <img src={loaderIcon} alt="loader"/>
            </div>
        </div>
    );
