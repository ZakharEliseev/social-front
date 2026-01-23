import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
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
