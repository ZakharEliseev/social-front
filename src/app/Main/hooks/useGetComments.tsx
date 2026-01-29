import { postApi } from '../api/posts';

interface Props {
    postId: number;
}

export const useGetComments = ({ postId }: Props) => {
    const { data, isLoading, refetch } = postApi.useGetAllCommentsQuery({
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
