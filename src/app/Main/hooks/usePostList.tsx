import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { postApi } from '../api/posts';
import { INITIAL_POSTS_LIMIT } from '../models/types/constants';

export const usePostList = () => {
    const [limit, setLimit] = useState(INITIAL_POSTS_LIMIT);

    const [deletePost] = postApi.useDeletePostMutation();
    const [isVisibleComments, setIsVisibleComments] = useState<Record<number, boolean>>({});

    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: 0,
        limit: limit,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) setLimit((prev) => prev + 2);
    }, [inView]);

    const hidePosts = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        deletePost,
        isVisibleComments,
        setIsVisibleComments,
        hidePosts,
        ref,
        posts,
        isLoading,
    };
};
