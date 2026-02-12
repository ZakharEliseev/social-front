import { Avatar } from '@/shared/ui';

import { GetCommentResponse } from '../../models/types';

import cls from './index.module.scss';

interface Props {
    isLoading: boolean;
    allComments: GetCommentResponse;
}

export const Comment = ({ isLoading, allComments }: Props) => {
    return (
        <div className={cls.comments}>
            {!isLoading ? (
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
    );
};
