import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {Suspense} from "react";
import Conspects from "../../pages/conspects/LazyConspects";
import {NavBar} from "../../features/user/ui/NavBar";
import Examination from "../../pages/examination/LazyExamination";
import {Layout} from "../../shared/ui/Layout/Layout";
import Game from "../../pages/game/LazyGame";
import {contactsData, navigationLinks} from "../../shared/const/navBar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout sideBar={<NavBar navigationLinks={navigationLinks} contactsData={contactsData} />}/>,
        children: [
            {
                path: "/conspects",
                element: (
                    <Suspense fallback="loading...">
                        <Conspects/>
                    </Suspense>
                ),
            },
            {
                path: "/examination",
                element: (
                    <Suspense fallback="loading...">
                        <Examination/>
                    </Suspense>
                ),
            },
            {
                path: "/game",
                element: (
                    <Suspense fallback="loading...">
                        <Game/>
                    </Suspense>
                ),
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router}/>
}