import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../../entities/User/User";
import {AppDispatch} from "../../StoreProvider";
import axios from "axios";
import {mock} from "node:test";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER, payload: user
    }),
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH, payload: auth
    }),
    setIsLoading: (payload: boolean): SetLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING, payload: payload
    }),
    setError: (error: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR, payload: error
    }),
login: (username: string, password: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));

            // Фиксированные значения для проверки
            const fixedUsername = 'Дэб';
            const fixedPassword = 'Dab';

            // Проверка на соответствие
            if (username === fixedUsername && password === fixedPassword) {
                localStorage.setItem('auth', "true");
                localStorage.setItem('username', fixedUsername);
                dispatch(AuthActionCreators.setIsAuth(true));
                dispatch(AuthActionCreators.setUser({ username: fixedUsername })); // Добавляем только имя пользователя
            } else {
                dispatch(AuthActionCreators.setError("Некорректный логин или пароль"));
            }
        } catch (error) {
            dispatch(AuthActionCreators.setError("Произошла ошибка: " + error.message));
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },

logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
}
