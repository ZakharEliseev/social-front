import { AddNewCommentResponse } from '@/app/Main/models/types/constants';
import { Avatar } from '@/shared/ui';

import { AddComment } from '../Form/AddComment';

import cls from './index.module.scss';

interface Props {
    postId: number;
    commentList?: AddNewCommentResponse[];
    isVisible: Boolean;
}

export const CommentList = ({ postId, commentList, isVisible }: Props) => {
    return (
        <>
            {commentList?.map((comment) => (
                <div className={isVisible ? cls.content : cls.hiddenContent} key={comment.id}>
                    {<Avatar username={comment.author.username} />}
                    <div className={cls.commentContent}>
                        <p className={cls.username}>{comment.author.username}</p>
                        <p className={cls.userText}>{comment.text}</p>
                    </div>
                </div>
            ))}
            <AddComment postId={postId} />
        </>
    );
};
