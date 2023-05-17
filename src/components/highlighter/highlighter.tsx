import React, {FC, useCallback} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {WithClassname} from '../../types/with-classname';

import styles from './highlighter.module.css';

interface HighlighterProps {
    searchWord: string
    title: string
}

export const Highlighter: FC<HighlighterProps & WithClassname> = (
    {
        searchWord,
        title,
        className
    }) => {

    const createTextHighlighter = useCallback((str: string) => {
        if (!searchWord) return str;
        const regExp = new RegExp(searchWord.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'), 'gi');
        const matchValue = str.match(regExp);

        if (matchValue) {
            return str.split(regExp).map((s, index, arr) => {
                if (index < arr.length - 1) {
                    const match = matchValue.shift()

                    return (
                        <React.Fragment key={uuidv4()}>
                            {s}
                            <span data-test-id='highlight-matches' className={styles.highlighter}>{match}</span>
                        </React.Fragment>
                    )
                }

                return s
            })
        }

        return str
    }, [searchWord])

    return <p className={className}>{createTextHighlighter(title)}</p>

};
