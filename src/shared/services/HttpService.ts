import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (authData) => ({
        url: '/auth/login',
        method: 'POST',
        body: authData
      }),
    }),
     register: builder.mutation({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = socialApi;