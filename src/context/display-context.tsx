import React, {createContext, FC, useContext, useEffect, useState} from 'react';

import {WithChildren} from '../types/with-children';


enum DisplayVariant {
    tile = 'tile',
    list = 'list'
}

interface DisplayContextValue {
    display: DisplayVariant | string
    setDisplay: (display: DisplayVariant) => void
}

const DisplayContext = createContext<DisplayContextValue | null>(null);

const DisplayProvider: FC<WithChildren> = ({children}) => {

    const [display, setDisplay] = useState('');
    const handleSetDisplay = (newVariant: DisplayVariant) => {
        setDisplay(newVariant);
        localStorage.setItem('display', newVariant);
    };

    useEffect(() => {
        const activeDisplayVariant = localStorage.getItem('display') || DisplayVariant.tile;

        if (activeDisplayVariant) {
            setDisplay(activeDisplayVariant);
        }
    },[display])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <DisplayContext.Provider value={{
            display,
            setDisplay: handleSetDisplay,
        }}>
            {children}
        </DisplayContext.Provider>
    );
};

function useDisplay() {
    const context = useContext(DisplayContext);

    if (context === null) {
        throw new Error('useDisplay must be used with ThemeProvider')
    } else {
        return context
    }
}

export {useDisplay, DisplayProvider, DisplayVariant};
