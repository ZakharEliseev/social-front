import { apiService } from '@/shared/services/HttpService';

import { AddNewCommentRequest, AddNewCommentResponse, GetCommentResponse, GetCommentsRequest } from './types/models';

export const commentApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        addNewComment: builder.mutation<AddNewCommentResponse, AddNewCommentRequest>({
            query: ({ id ,text}) => ({
                url: `/posts/${id}/comments`,
                method: 'POST',
                body: {text},
            }),
            invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
        }),
        getAllComments: builder.query<GetCommentResponse, GetCommentsRequest>({
            query: ({id, params}) => ({
                url: `/posts/${id}/comments`,
                method: 'GET',
                params: {
                    offset: params.offset ?? 0,
                    limit: params.limit ?? 100
                },
            }),
            providesTags: [{ type: 'Comments', id: 'LIST' }],
        }),
    }),
});
