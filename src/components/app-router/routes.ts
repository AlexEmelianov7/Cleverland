import React, {FC} from 'react';

import {BookPage} from '../../pages/book';
import {MainPage} from '../../pages/main';
import {TermsContractPage} from '../../pages/terms-contract-page/terms-contract-page';
import { AuthPage } from "../../pages/auth/auth-page";
import { RegistrationPage } from "../../pages/registration/registration-page";
import { RecoveryPage } from "../../pages/recovery/recovery-page";

export interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
}

export interface IRoute extends RouteObject{
    path: string
    Element: FC | FC<any>
    title?: string
}

export enum Routes {
    main = '/books/:category',
    bookAll = '/books/all',
    book = '/books/:category/:id',
    contract = '/contract',
    terms = '/terms',
    auth = '/auth',
    registration = '/registration',
    recovery = '/forgot-pass',
}

export const PUBLIC_ROUTES: IRoute[] = [
    {path: Routes.auth, Element: AuthPage},
    {path: Routes.registration, Element: RegistrationPage},
    {path: Routes.recovery, Element: RecoveryPage},
];

export const PRIVATE_ROUTES: IRoute[] = [
    {path: Routes.main, Element: MainPage},
    {path: Routes.book, Element: BookPage},
    {path: Routes.contract, Element: TermsContractPage},
    {path: Routes.terms, Element: TermsContractPage},
];
