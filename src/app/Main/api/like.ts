import { apiService } from '@/shared/services/HttpService';

import { AddLikeRequest } from './types/models';


export const likeApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        toggleLike: builder.mutation<void, AddLikeRequest>({
            query: ({id}) => ({
                url: `/posts/${id}/like`,
                method: 'PUT',
            }),
             invalidatesTags: [
                { type: 'Likes', id: 'LIST' },
                { type: 'Posts', id: 'LIST' }
            ],
        }),
    }),
});
