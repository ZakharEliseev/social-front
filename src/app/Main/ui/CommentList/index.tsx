import { Dispatch, SetStateAction } from 'react';

import { AddNewCommentResponse } from '@/app/Main/models/types/constants';
import { Avatar } from '@/shared/ui';

import { postApi } from '../../api/posts';
import { AddComment } from '../Form/AddComment';

import cls from './index.module.scss';

interface Props {
    postId: number;
    commentList?: AddNewCommentResponse[];
    isVisibleComments: boolean;
    setIsVisibleComments: Dispatch<SetStateAction<{ [postId: number]: boolean }>>;
}

export const CommentList = ({ postId, isVisibleComments }: Props) => {
    const { data: commentList } = postApi.useGetAllCommentsQuery(
        {
            id: postId,
            params: { offset: 0, limit: 5 },
        },
        { skip: !isVisibleComments },
    );

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
            {isVisibleComments && commentList && commentList?.length >= 5 ? (
                <p className={cls.hideComment}>Скрыть комментарии</p>
            ) : null}
            <AddComment postId={postId} />
        </>
    );
};
