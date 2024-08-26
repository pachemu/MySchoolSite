import React from "react";
import {Outlet} from "react-router-dom";
interface LayoutProps {
    sideBar?: JSX.Element;
    footer?: React.ReactNode;
}
import * as styles from './Layout.module.scss'

export const Layout = ({sideBar, footer} : LayoutProps) => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                {sideBar}
            </div>
            <div className={styles.main}>
                <Outlet/>
            </div>
            <div className={styles.footer}>
                {footer}
            </div>
        </div>
    )
}