import { socialApi } from '@/app/api';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
})

export {store};