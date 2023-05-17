import React, { FC } from 'react';

import { WithChildren } from '../../../types/with-children';

import styles from './modal-wrapper.module.css';

interface ModalWrapperProps {
    dataTestId?: string
}

export const ModalWrapper: FC<ModalWrapperProps & WithChildren> = (
    {
        dataTestId,
        children
    }) => (
        <div
            className={styles.modalWrapper}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
