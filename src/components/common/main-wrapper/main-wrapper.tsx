import React, { FC } from "react";
import { useMatch } from "react-router-dom";

import { WithChildren } from "../../../types/with-children";
import { Routes } from "../../app-router/routes";

import { Footer } from "./footer/footer";
import { Header } from "./header/header";

import styles from "./main-wrapper.module.css";

export const MainWrapper: FC<WithChildren> = ({children}) => {
    const isBookPage = useMatch(Routes.book);
    const main = isBookPage ? styles.bookMain : styles.main;

    return (
        <div className={styles.wrapper}>
            <Header/>
            <main className={`${main}`}>{children}</main>
            <Footer/>
        </div>

    )
}
