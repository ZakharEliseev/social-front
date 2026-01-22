import { configureStore } from '@reduxjs/toolkit'

import { socialApi } from '../../shared/services/HttpService'
import tokenReducer  from '../authSlice'

const store = configureStore({
  reducer: {
    token: tokenReducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socialApi.middleware),
})

export {store};