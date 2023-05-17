import React, { FC, MouseEventHandler } from 'react';

import { WithChildren } from '../../../types/with-children';

import styles from './overlay.module.css';

interface OverlayProps {
    onClose: MouseEventHandler<HTMLElement>
}

export const Overlay: FC<OverlayProps & WithChildren> = ({children, onClose}) => (
        <div onClick={onClose} className={styles.overlay} role='presentation'>
            {children}
        </div>
    );
