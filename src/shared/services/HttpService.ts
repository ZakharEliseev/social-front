import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
  reducerPath: 'apiService',
  tagTypes: ['Posts', 'Comments'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1', 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },}),
  endpoints: () => ({}),
});
