import { SetStateAction, useEffect, useState } from 'react';

import ReactModal from 'react-modal';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT, modalStyles } from '../../models/constants';
import { GetCommentResponse, GetPostsResponse } from '../../models/types';
import { Comment } from '../Comment/';
import { AddComment } from '../Form/AddComment';

import cls from './index.module.scss';

interface Props {
    postId: number;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
    setAllPosts: React.Dispatch<SetStateAction<GetPostsResponse>>;
}

export const CommentList = ({ postId, modalIsOpen, setModalIsOpen, setAllPosts }: Props) => {
    const [allComments, setAllComments] = useState<GetCommentResponse>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setAllComments([]);
        setPage(1);
    }, [postId]);

    const { data: commentList } = postApi.useGetAllCommentsQuery({
        id: postId,
        params: { page: page, limit: POST_COMMENT_COUNT },
    });

    useEffect(() => {
        if (commentList) {
            setAllComments((prev) => {
                const uniqueCommentId = new Set(prev.map((post) => post.id));
                const newPosts = commentList.filter((comment) => !uniqueCommentId.has(comment.id));
                return [...prev, ...newPosts];
            });
        }
    }, [commentList, page]);

    const onSuccess = () => {
        setAllComments([]);
        setPage(1);
        setAllPosts((prev) =>
            prev.map((post) =>
                post.id === postId ? { ...post, commentsCount: post.commentsCount + 1 } : post,
            ),
        );
    };

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={modalStyles}
            appElement={document.getElementById('root')!}>
            <Comment isLoading allComments={allComments} />
            {commentList?.length !== 0 && commentList?.length! === POST_COMMENT_COUNT ? (
                <p className={cls.loadComments} onClick={() => setPage((prev) => prev + 1)}>
                    Загрузить еще комментариев
                </p>
            ) : (
                <p className={cls.loadComments}>Все комментарии прочитаны</p>
            )}
            <div>
                <AddComment onSuccess={onSuccess} postId={postId} />
            </div>
        </ReactModal>
    );
};
