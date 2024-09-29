import {BrowserRouter as Router, BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import {BaseLayout} from "../../shared/ui/Layout/BaseLayout";
import {
    navigationLinksTeacher,
    navigationLinksUnlogined
} from "../../features/user/const/navBar";
import {teacherRoutes, unLoginedUsers} from "./index";
import {useTypedSelector} from "../../features/user/model/useTypedSelector";
import {useActions} from "../store/reducers/auth/hooks/useActions";
import {IUser} from "../../entities/User/User";

function AppRouter() {
    const { setUser, setIsAuth} = useActions()
    useEffect(()=> {
        if(localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username'|| '')} as IUser)
            setIsAuth(true)

    }},[])
    const {auth} = useTypedSelector(state => state.authReducer)
    return (
        auth ?
            <BrowserRouter>
                <BaseLayout items={navigationLinksTeacher}>
                    <Suspense fallback={'loading'}>
                        <Routes>
                            {teacherRoutes.map(route =>
                                <Route key={route.path} path={route.path} element={route.component}/>)}
                        </Routes>
                    </Suspense>
                </BaseLayout>
            </BrowserRouter>
            :

            <Router>
                <BaseLayout items={navigationLinksUnlogined}>
                    <Suspense fallback="Загрузка...">
                        <Routes>
                            {unLoginedUsers.map(route =>
                                <Route key={route.path} path={route.path} element={route.component}/>)}
                        </Routes>
                    </Suspense>
                </BaseLayout>
            </Router>
    );
}

export default AppRouter;
