import { userApi } from '@/app/Profile/api/users';
import { Avatar } from '@/shared/ui';

import { AddNewCommentResponse } from '../../models/types';

import cls from './index.module.scss';

interface Props {
    comment: AddNewCommentResponse;
}

export const Comment = ({ comment }: Props) => {
    const { data: user } = userApi.useGetUserProfileByIdQuery({
        userId: Number(comment.author.id),
    });

    return (
        <div className={cls.comments}>
            <div className={cls.content} key={comment.id}>
                <Avatar avatarPath={user?.avatar} username={comment.author.username} />
                <div className={cls.commentContent}>
                    <p className={cls.username}>{comment.author.username}</p>
                    <p className={cls.userText}>{comment.text}</p>
                </div>
            </div>
        </div>
    );
};
