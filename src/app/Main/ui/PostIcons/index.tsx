import { Dispatch, SetStateAction } from 'react';

import { HeartFilled, HeartOutlined, MessageFilled, MessageOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { AddNewPostResponse } from '../../models/types/constants';

import cls from './index.module.scss';

interface Props {
    post: AddNewPostResponse;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const PostIcons = ({ post, setIsVisible }: Props) => {
    const [toggleLike] = postApi.useToggleLikeMutation();

    return (
        <div className={cls.icons}>
            <div className={cls.content}>
                {post.isLiked ? (
                    <HeartFilled className={cls.like} onClick={() => toggleLike({id: post.id})} />
                ) : (
                    <HeartOutlined onClick={() => toggleLike({id: post.id})} className={cls.like} />
                )}
                {post.likesCount}
            </div>
            <div className={cls.content} onClick={() => setIsVisible((isVisible) => !isVisible)}>
                {post.comments?.length ? (
                    <MessageFilled className={cls.comment} />
                ) : (
                    <MessageOutlined className={cls.comment} />
                )}
                {post.comments?.length || 0}
            </div>
        </div>
    );
};
