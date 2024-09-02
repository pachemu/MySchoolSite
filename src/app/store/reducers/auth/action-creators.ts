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
        async (dispatch:AppDispatch) => {
                const response = await axios.get<IUser[]>('./users/users.json');
                const mockUser = response.data.find(user =>
                    user.username === username && user.password === password
                );

                if (mockUser) {
                    localStorage.setItem('auth', "true");
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setIsAuth(true));
                    dispatch(AuthActionCreators.setUser(mockUser));
                } else {
                    dispatch(AuthActionCreators.setError("Некорректный логин или пароль"));
                }
                
            } catch (error) {
                dispatch(AuthActionCreators.setError("Ошибка при получении данных: " + error.message));
            } finally {
                dispatch(AuthActionCreators.setIsLoading(false));
            }
        }, 3000);
        
    } catch (e) {
        dispatch(AuthActionCreators.setError("Произошла ошибка: " + e.message));
        dispatch(AuthActionCreators.setIsLoading(false));
    }

};
    logout: () => async(dispatch:AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false));
    }
}
