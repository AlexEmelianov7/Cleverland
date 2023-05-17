import React, { FC, useState } from 'react';

import dropdownArrow from '../../../assets/icons/arrow_drop_down.svg';

import styles from './dropdown.module.css';

interface DropdownProps {
    dateTitle: string
    dropdownList: string[]
    changeMonthIndex: (index: number) => void
}

export const Dropdown: FC<DropdownProps> = (
    {
        dateTitle,
        dropdownList,
        changeMonthIndex
    }) => {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(prevState => !prevState);

    const handleChangeMonth = (index: number) => {
        setOpen(false);
        changeMonthIndex(index);
    }

    return (
        <div className={styles.dropdown}>
            <button
                className={styles.button}
                type='button'
                onClick={toggleDropdown}
            >
                <span>{dateTitle}</span>
                <img src={dropdownArrow} alt='arrow' />
            </button>
            {open && (
                <ul className={styles.dropdownList}>
                    {dropdownList.map((item, index) => (
                        <li
                            key={item}
                            className={`${styles.listItem}`}
                            onClick={() => handleChangeMonth(index)}
                            role='presentation'
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
