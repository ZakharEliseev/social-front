import { notification } from 'antd';

import { authApi } from '@/app/Auth/api/auth';
import { configureStore } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import userSlice from './userSlice';

export const rtkQueryErrorLogger = () => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
        notification.error({
            title: 'Ошибка запроса',
            description: action.payload?.data?.title || 'Что-то пошло не так',
        });
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        profile: userSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
