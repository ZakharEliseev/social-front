import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { postApi } from '../api/posts';


interface Props {
    postId: number;
    setIsVisibleComments: any;
    isVisibleComments: boolean;
}

export const useCommentList = ({ postId, setIsVisibleComments, isVisibleComments }: Props) => {
    const [limit, setLimit] = useState(10);

    const { data: commentList, isFetching } = postApi.useGetAllCommentsQuery(
        {
            id: postId,
            params: { offset: 0, limit: limit },
        },
        { skip: !isVisibleComments },
    );

    const { ref, inView } = useInView();

    useEffect(() => {
        if (!isFetching && isVisibleComments && inView) setLimit((prev) => prev + 4);
    }, [inView]);

    const hideComments = () => {
        setIsVisibleComments((prev: { [postId: number]: boolean }) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    return {
        hideComments,
        commentList,
        ref,
    };
};
