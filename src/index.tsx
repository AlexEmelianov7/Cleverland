import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { HashRouter } from 'react-router-dom';

import {AppRouter} from './components/app-router/app-router';
import {MainWrapper} from './components/common/main-wrapper/main-wrapper';
import {DisplayProvider} from './context/display-context';
import {ScreenWidthProvider} from './context/screen-width-context';
import {store} from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <ScreenWidthProvider>
                <DisplayProvider>
                    <HashRouter>
                        <MainWrapper>
                            <AppRouter/>
                        </MainWrapper>
                    </HashRouter>
                </DisplayProvider>
            </ScreenWidthProvider>
        </Provider>
    // </React.StrictMode>
);
