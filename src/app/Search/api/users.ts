import { apiService } from '@/shared/services/HttpService';

import { GetUsersRequest, GetUsersResponseList } from '../models/constants';

export const userApi = apiService.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<GetUsersResponseList, GetUsersRequest>({
            query: ({username}) => ({
                url: '/users/',
                method: 'GET',
                params: {
                  q: username
                }
            }),
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
});
