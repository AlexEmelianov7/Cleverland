import React, {FC, useState} from 'react';

import {useScreenWidth} from '../../context/screen-width-context';

import {DisplaySwitchers} from './display-switchers/display-switchers';
import {SearchInput} from './search-input/search-input';
import {SortButton} from './sort-button/sort-button';

import styles from './content-menu.module.css';

interface ContentMenuProps {
    searchQuery: string
    searchQueryChange: (value: string) => void
    descendingSort: boolean
    onSort: () => void
}

export const ContentMenu: FC<ContentMenuProps> = (
    {
        searchQuery= '',
        searchQueryChange,
        descendingSort,
        onSort
    }) => {

    const { screenWidth } = useScreenWidth();

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    // const [searchQuery, setSearchQuery] = useState('');

    const handleSearchOpen = () => setOpenSearch(true);

    const handleSearchClose = () => setOpenSearch(false);

    // const handleSetSearchQuery = (event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);

    const searchOpenMobile = screenWidth <= 670 ? handleSearchOpen : () => {};

    // const handleClearSearchQuery = () => setSearchQuery('');

    const searchCloseMobile = () => {
        if (screenWidth <= 670) {
            handleSearchClose()
        }
        // else {
        //     handleClearSearchQuery()
        // }
    }

    return (
        <div className={styles.contentMenu}>
            <div className={styles.searchMenu}>
                <SearchInput
                    query={searchQuery}
                    onClick={searchOpenMobile}
                    queryChange={searchQueryChange}
                    formClass={openSearch ? styles.searchInputWrapperMobile : ''}
                    searchBtnClass={openSearch ? styles.hide : ''}
                    searchInputClass={openSearch ? styles.searchInputMobile : ''}
                    autofocus={true}
                >
                    {(searchQuery || screenWidth <= 670)
                        &&
                        <button
                            data-test-id='button-search-close'
                            type='button'
                            className={`${styles.cancelButton} ${!openSearch ? styles.hide : ''}`}
                            onClick={searchCloseMobile}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 3.52876C12.7319 3.78911 12.7319 4.21122 12.4716 4.47157L4.47157 12.4716C4.21122 12.7319 3.78911 12.7319 3.52876 12.4716C3.26841 12.2112 3.26841 11.7891 3.52876 11.5288L11.5288 3.52876C11.7891 3.26841 12.2112 3.26841 12.4716 3.52876Z" fill="url(#paint0_linear_1485_12280)"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.52876 3.52876C3.78911 3.26841 4.21122 3.26841 4.47157 3.52876L12.4716 11.5288C12.7319 11.7891 12.7319 12.2112 12.4716 12.4716C12.2112 12.7319 11.7891 12.7319 11.5288 12.4716L3.52876 4.47157C3.26841 4.21122 3.26841 3.78911 3.52876 3.52876Z" fill="url(#paint1_linear_1485_12280)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_1485_12280" x1="7.99216" y1="-6.58317" x2="-28.1338" y2="19.9251" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F83600"/>
                                        <stop offset="1" stopColor="#F9D423"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_1485_12280" x1="7.99216" y1="-6.58317" x2="-28.1338" y2="19.9251" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F83600"/>
                                        <stop offset="1" stopColor="#F9D423"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    }
                </SearchInput>
                <SortButton className={openSearch ? styles.hide : ''} descendingSort={descendingSort} onSort={onSort}/>
            </div>
            <DisplaySwitchers className={openSearch? styles.hide : ''}/>
        </div>
    )
}
