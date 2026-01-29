import { postApi } from '@/app/api/posts';

export const useGetAllPosts = () => {
    const { data, isLoading, refetch } = postApi.useGetAllPostsQuery({
        offset: 0,
        limit: 100,
    });

    return {
        data,
        isLoading,
        refetch,
    };
};
