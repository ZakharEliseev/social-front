import { authApi } from '@/app/api/auth';
import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    profile: userSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;