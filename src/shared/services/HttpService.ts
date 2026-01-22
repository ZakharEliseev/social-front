import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface LoginResponse {
  accessToken: string;
  status?: number;
}

interface LoginRequest {
  email: string;
  password: string
}

interface RegisterResponse {
  createdAt: string;
  email: string;
  id: string;
  username: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_API_URL || 'http://localhost:5001/api/v1', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },}),
  endpoints: () => ({}),
});

export const socialApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (authData) => ({
        url: '/auth/login',
        method: 'POST',
        body: authData,
      }),
    }),
     register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = socialApi;

