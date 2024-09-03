import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../../entities/User/User";
import {AppDispatch} from "../../StoreProvider";
import axios from "axios";
import {mock} from "node:test";

export const AuthActionCreators = {
    setUser: (user: any): SetUserAction => ({
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
    login : (username: string, password: string) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setIsLoading(true));

                setTimeout(async () => {
                    const response = await axios.post('https://backend-indol-beta.vercel.app/login', { username, password });

                    if (response.data.success) {
                        localStorage.setItem('auth', "true");
                        localStorage.setItem('username', response.data.username);
                        dispatch(AuthActionCreators.setIsAuth(true));
                        dispatch(AuthActionCreators.setUser({ username: response.data.username }));
                    } else {
                        dispatch(AuthActionCreators.setError("Некорректный логин или пароль"));
                    }
                    dispatch(AuthActionCreators.setIsLoading(false));
                }, 3000);

            } catch (e) {
                dispatch(AuthActionCreators.setError('Произошла ошибка при аутентификации!'));
            }
        },
    logout: () => async(dispatch:AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false));
    }
}
