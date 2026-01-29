import { apiService } from '@/shared/services/HttpService';

import { LoginRequest, LoginResponse, ProfileResponse, RegisterRequest, RegisterResponse } from './types/models';

export const authApi = apiService.injectEndpoints({
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
        getUserProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
            }),
        }),
    }),
});
