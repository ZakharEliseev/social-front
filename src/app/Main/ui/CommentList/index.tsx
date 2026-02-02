import { Dispatch, SetStateAction } from 'react';

import { AddNewCommentResponse, INITIAL_COMMENTS_LIMIT } from '@/app/Main/models/types/constants';
import { Avatar } from '@/shared/ui';

import { useCommentList } from '../../hooks/useCommentList';
import { AddComment } from '../Form/AddComment';

import cls from './index.module.scss';

interface Props {
    postId: number;
    commentList?: AddNewCommentResponse[];
    isVisibleComments: boolean;
    setIsVisibleComments: Dispatch<SetStateAction<{ [postId: number]: boolean }>>;
}

export const CommentList = ({ postId, isVisibleComments, setIsVisibleComments }: Props) => {
    const { commentList, hideComments, ref } = useCommentList({
        postId,
        setIsVisibleComments,
        isVisibleComments,
    });

    return (
        <>
            {commentList?.map((comment) => (
                <div
                    className={isVisibleComments ? cls.content : cls.hiddenContent}
                    key={comment.id}>
                    {<Avatar username={comment.author.username} />}
                    <div className={cls.commentContent}>
                        <p className={cls.username}>{comment.author.username}</p>
                        <p className={cls.userText}>{comment.text}</p>
                    </div>
                </div>
            ))}
            {isVisibleComments && commentList && commentList?.length >= INITIAL_COMMENTS_LIMIT ? (
                <p className={cls.hideComment} onClick={hideComments}>
                    Скрыть комментарии
                </p>
            ) : null}
            <AddComment postId={postId} ref={ref} />
        </>
    );
};
