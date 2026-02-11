import { SetStateAction, useEffect, useState } from 'react';

import ReactModal from 'react-modal';

import { Avatar } from '@/shared/ui';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT, modalStyles } from '../../models/constants';
import { GetCommentResponse, GetPostsResponse } from '../../models/types';
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
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        setAllComments([]);
        setPage(0);
    }, [postId]);

    const { data: commentList, isLoading } = postApi.useGetAllCommentsQuery({
        id: postId,
        params: { offset: page * POST_COMMENT_COUNT, limit: POST_COMMENT_COUNT },
    });

    useEffect(() => {
        if (commentList) {
            setAllComments((prev) => [...prev, ...commentList]);
        }
    }, [commentList, page]);

    const handleSuccess = () => {
        setAllComments([]);
        setPage(0);
        setAllPosts((prev) =>
            prev.map((post) =>
                post.id === postId ? { ...post, commentsCount: post.commentsCount + 1 } : post,
            ),
        );
    }

    return (
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}>
                <div className={cls.comments}>
                    {isLoading ? (
                        <div>Загрузка комментариев</div>
                    ) : (
                        allComments?.map((comment) => (
                            <div className={cls.content} key={comment.id}>
                                <Avatar username={comment.author.username} />
                                <div className={cls.commentContent}>
                                    <p className={cls.username}>{comment.author.username}</p>
                                    <p className={cls.userText}>{comment.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div>
                    {commentList && commentList.length > allComments.length && <p className={cls.loadComments}>Загрузить еще комментариев</p>}
                    <AddComment
                        onSuccess={handleSuccess}
                        postId={postId}
                    />
                </div>
            </ReactModal>
    );
};
