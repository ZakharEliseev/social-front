import { apiService } from '@/shared/services/HttpService';

import { AddNewPostRequest, AddNewPostResponse, GetPostsRequest, GetPostsResponse } from './types/models';

export const postApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        addNewPost: builder.mutation<AddNewPostResponse, AddNewPostRequest>({
            query: (payload) => ({
                url: '/posts',
                method: 'POST',
                body: payload,
                invalidatesTags: ['Posts'],
            }),
        }),
        getAllPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: (params) => ({
                url: '/feed/all',
                method: 'GET',
                params: {
                    offset: params.offset ?? 0,
                    limit: params.limit ?? 100
                },
                providesTags: ['Posts'],
            }),
        }),
    }),
});
