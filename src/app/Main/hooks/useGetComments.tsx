import { commentApi } from '@/app/Main/api/comment';

interface Props {
    postId: number;
}

export const useGetComments = ({ postId }: Props) => {
    const { data, isLoading, refetch } = commentApi.useGetAllCommentsQuery({
        id: postId,
        params: {
            offset: 0,
            limit: 100,
        },
    });

    return {
        data,
        isLoading,
        refetch,
    };
};
