import React, {createContext, FC, useContext, useEffect, useState} from 'react';

import {WithChildren} from '../types/with-children';

interface ScreenWidthValue {
    screenWidth: number
    isDesktopView: boolean
}

const ScreenWidthContext = createContext<ScreenWidthValue | null>(null)

const ScreenWidthProvider:FC<WithChildren> = ({ children }) =>  {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const callback = () => setScreenWidth(window.innerWidth)

    const isDesktopView = screenWidth > 1086;

    useEffect(() => {
        window.addEventListener('resize', callback)

        return () => window.removeEventListener('resize', callback)
    },[])

    return (

        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ScreenWidthContext.Provider value={{
            screenWidth,
            isDesktopView
        }}>
            {children}
        </ScreenWidthContext.Provider>
    )
}

function useScreenWidth() {
    const context = useContext(ScreenWidthContext);

    if (context === null) {
        throw new Error('useScreenWidth must be used with ScreenWidthProvider')
    }
    else {
        return context
    }
}


export {useScreenWidth, ScreenWidthProvider}
