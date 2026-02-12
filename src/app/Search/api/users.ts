import { apiService } from '@/shared/services/HttpService';

import { FollowUser, GetUsersRequest, GetUsersResponseList } from '../models/constants';

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
        follow: builder.mutation<void, FollowUser>({
            query: ({ id, isFollow }) => ({
                url: `/users/${id}/follow`,
                method: isFollow ? 'DELETE' : 'POST',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
});
