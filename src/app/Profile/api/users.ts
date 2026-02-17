import { ProfileResponse } from '@/app/Auth/models/types';
import { apiService } from '@/shared/services/HttpService';

import { GetUsersRequest } from '../../Search/models/constants';
import {
    FollowUserRequest,
    GetProfileByIdRequest,
    GetUsersResponseList,
    UpdatePasswordRequest,
    UpdateProfileRequest,
} from '../../Search/models/types';

export const userApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<GetUsersResponseList, GetUsersRequest>({
            query: ({ username }) => ({
                url: '/users/',
                method: 'GET',
                params: {
                    q: username,
                },
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        follow: builder.mutation<void, FollowUserRequest>({
            query: ({ id, isFollow }) => ({
                url: `/users/${id}/follow`,
                method: isFollow ? 'DELETE' : 'POST',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        getUserProfileById: builder.query<ProfileResponse, GetProfileByIdRequest>({
            query: ({ userId }) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        updateProfile: builder.mutation<void, UpdateProfileRequest>({
            query: (payload) => ({
                url: `/users/profile`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        updatePassword: builder.mutation<void, UpdatePasswordRequest>({
            query: (payload) => ({
                url: `/users/profile/password`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        uploadAvatar: builder.mutation<void, FormData>({
            query: (payload) => ({
                url: `/users/profile/avatar`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [{ type: 'Users' }],
        }),
        deleteAvatar: builder.mutation<void, void>({
            query: () => ({
                url: `/users/profile/avatar`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Users' }],
        }),
    }),
});
