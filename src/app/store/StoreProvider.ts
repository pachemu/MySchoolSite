import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {thunk} from "redux-thunk";
import reducers from './reducers'
// Определите свои редукторы
const rootReducer = combineReducers(reducers);

// Создайте и экспортируйте хранилище
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Отключите проверку сериализации, если необходимо
        thunk: true
    }),
    devTools: process.env.NODE_ENV !== 'production', // Включить DevTools в режиме разработки
});

// Определите типы для диспетчеров и состояния
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
