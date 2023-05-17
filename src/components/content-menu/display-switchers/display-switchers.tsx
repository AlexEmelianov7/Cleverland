import React, {FC} from 'react';

import {DisplayVariant, useDisplay} from '../../../context/display-context';
import {WithClassname} from '../../../types/with-classname';

import styles from './display-buttons.module.css';

export const DisplaySwitchers: FC<WithClassname> = ({className = ''}) => {

    const { display, setDisplay } = useDisplay();

    const handleSetTileDisplay = () => {
        setDisplay(DisplayVariant.tile)
    }

    const handleSetListDisplay = () => {
        setDisplay(DisplayVariant.list)
    }

    return (
        <div className={`${className} ${styles.displaySwitchers}`}>
            <button
                data-test-id='button-menu-view-window'
                type='button'
                onClick={handleSetTileDisplay}
                className={`${styles.displayButton} ${display === DisplayVariant.tile ? styles.activeTile : ''}`}
            >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`${display === DisplayVariant.tile ? styles.svgActive : ''}`} fillRule="evenodd" clipRule="evenodd" d="M3.81818 3.75415C3.36631 3.75415 3 4.12046 3 4.57233V11.1178C3 11.5697 3.36631 11.936 3.81818 11.936H10.3636C10.8155 11.936 11.1818 11.5697 11.1818 11.1178V4.57233C11.1818 4.12046 10.8155 3.75415 10.3636 3.75415H3.81818ZM4.63636 10.2996V5.39051H9.54545V10.2996H4.63636ZM13.6364 3.75415C13.1845 3.75415 12.8182 4.12046 12.8182 4.57233V11.1178C12.8182 11.5697 13.1845 11.936 13.6364 11.936H20.1818C20.6337 11.936 21 11.5697 21 11.1178V4.57233C21 4.12046 20.6337 3.75415 20.1818 3.75415H13.6364ZM14.4545 10.2996V5.39051H19.3636V10.2996H14.4545ZM3 14.3905C3 13.9386 3.36631 13.5723 3.81818 13.5723H10.3636C10.8155 13.5723 11.1818 13.9386 11.1818 14.3905V20.936C11.1818 21.3878 10.8155 21.7542 10.3636 21.7542H3.81818C3.36631 21.7542 3 21.3878 3 20.936V14.3905ZM4.63636 15.2087V20.1178H9.54545V15.2087H4.63636ZM13.6364 13.5723C13.1845 13.5723 12.8182 13.9386 12.8182 14.3905V20.936C12.8182 21.3878 13.1845 21.7542 13.6364 21.7542H20.1818C20.6337 21.7542 21 21.3878 21 20.936V14.3905C21 13.9386 20.6337 13.5723 20.1818 13.5723H13.6364ZM14.4545 20.1178V15.2087H19.3636V20.1178H14.4545Z" fill="#A7A7A7"/>
                </svg>
            </button>
            <button
                data-test-id='button-menu-view-list'
                onClick={handleSetListDisplay}
                type='button'
                className={`${styles.displayButton} ${display === DisplayVariant.list ? styles.activeList : ''}`}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={`${display === DisplayVariant.list ? styles.svgActive : ''}`} fillRule="evenodd" clipRule="evenodd" d="M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z" fill="#A7A7A7"/>
                    <path className={`${display === DisplayVariant.list ? styles.svgActive : ''}`} fillRule="evenodd" clipRule="evenodd" d="M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z" fill="#A7A7A7"/>
                    <path className={`${display === DisplayVariant.list ? styles.svgActive : ''}`} fillRule="evenodd" clipRule="evenodd" d="M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z" fill="#A7A7A7"/>
                </svg>
            </button>
        </div>
    );
};
