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

export interface AddNewPostResponse {
  id: number;
  title: string;
  text: string;
  createdAt: string,
  author: {
    id: string;
    username: string;
  },
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  comments?: [];
}

export interface AddNewPostRequest {
    title?: string;
    text: string;
}

export interface GetPostsRequest {
  offset?: number; 
  limit?: number;
}

export type GetPostsResponse = AddNewPostResponse[];

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
        addNewPost: builder.mutation<AddNewPostResponse, AddNewPostRequest>({
            query: (userData) => ({
                url: '/posts',
                method: 'POST',
                body: userData,
                // invalidatesTags: ['Post'],   
            }),
        }),
        getMyPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: (params) => ({
                url: '/posts',
                method: 'GET',
                params: {
                    offset: params.offset ?? 0,
                    limit: params.limit ?? 10
                },
                // providesTags: ['Post'],
            }),
        }),
    }),
});
