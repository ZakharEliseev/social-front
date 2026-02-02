import { Dispatch, SetStateAction } from 'react';

import { HeartFilled, HeartOutlined, MessageFilled, MessageOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { AddNewPostResponse } from '../../models/types/constants';

import cls from './index.module.scss';

interface Props {
    post: AddNewPostResponse;
    setIsVisibleComments: Dispatch<SetStateAction<{ [postId: number]: boolean }>>;
}

export const PostIcons = ({ post, setIsVisibleComments }: Props) => {
    const [toggleLike] = postApi.useToggleLikeMutation();

    return (
        <div className={cls.icons}>
            <div className={cls.content}>
                {post.isLiked ? (
                    <HeartFilled className={cls.like} onClick={() => toggleLike({ id: post.id })} />
                ) : (
                    <HeartOutlined
                        onClick={() => toggleLike({ id: post.id })}
                        className={cls.like}
                    />
                )}
                {post.likesCount}
            </div>
            <div
                className={cls.content}
                onClick={() =>
                    setIsVisibleComments((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                    }))
                }>
                {post?.commentsCount ? (
                    <MessageFilled className={cls.comment} />
                ) : (
                    <MessageOutlined className={cls.comment} />
                )}
                {post?.commentsCount || 0}
            </div>
        </div>
    );
};
