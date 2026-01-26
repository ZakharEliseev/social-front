import { apiService } from '@/shared/services/HttpService';

export interface LoginResponse {
    accessToken: string;
    status?: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    createdAt: string;
    email: string;
    id: string;
    username: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface ProfileResponse {
    id: number;
    username: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
    createdAt: string;
}

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
        getUserProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
            }),
        }),
    }),
});
