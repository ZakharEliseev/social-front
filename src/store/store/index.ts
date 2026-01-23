import { socialApi } from '@/app/api';
import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../userSlice';

const store = configureStore({
  reducer: {
    profile: userSlice,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
})

export {store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;