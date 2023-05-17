import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-redux';

import {PRIVATE_ROUTES, PUBLIC_ROUTES} from './routes';

export const AppRouter: FC = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <Routes>
            {user
                ?
                PRIVATE_ROUTES.map(({ path, Element}) => <Route key={path} path={path} element={<Element />} />)
                :
                PUBLIC_ROUTES.map(({ path, Element}) => <Route key={path} path={path} element={<Element />} />)
            }
            <Route path="*" element={<Navigate to={user ? '/books/all' : '/auth'} replace={true}/>} />
        </Routes>
    );
};
