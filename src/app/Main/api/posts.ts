import { apiService } from '@/shared/services/HttpService';

import {
    AddLikeRequest,
    AddNewCommentRequest,
    AddNewCommentResponse,
    AddNewPostRequest,
    AddNewPostResponse,
    DeletePostRequest,
    GetCommentResponse,
    GetCommentsRequest,
    GetPostsRequest,
    GetPostsResponse,
} from '../models/types/types';

export const postApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        addNewPost: builder.mutation<AddNewPostResponse, AddNewPostRequest>({
            query: (payload) => ({
                url: '/posts',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        deletePost: builder.mutation<void, DeletePostRequest>({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        getAllPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: (params) => ({
                url: '/feed/all',
                method: 'GET',
                params: {
                    offset: params.offset ?? 0,
                    limit: params.limit ?? 100,
                },
            }),
            providesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        addNewComment: builder.mutation<AddNewCommentResponse, AddNewCommentRequest>({
            query: ({ id, text }) => ({
                url: `/posts/${id}/comments`,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: [
                { type: 'Comments', id: 'LIST' },
                { type: 'Posts', id: 'LIST' },
            ],
        }),
        getAllComments: builder.query<GetCommentResponse, GetCommentsRequest>({
            query: ({ id, params }) => ({
                url: `/posts/${id}/comments`,
                method: 'GET',
                params: {
                    offset: params.offset ?? 0,
                    limit: params.limit ?? 100,
                },
            }),
            providesTags: [{ type: 'Comments', id: 'LIST' }],
        }),
        toggleLike: builder.mutation<void, AddLikeRequest>({
            query: ({ id }) => ({
                url: `/posts/${id}/like`,
                method: 'PUT',
            }),
            invalidatesTags: [
                { type: 'Likes', id: 'LIST' },
                { type: 'Posts', id: 'LIST' },
            ],
        }),
    }),
});
