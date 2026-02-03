import { Dispatch, SetStateAction } from 'react';

import { HeartFilled, HeartOutlined, MessageFilled, MessageOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { AddNewPostResponse, GetPostsResponse } from '../../models/types/constants';

import cls from './index.module.scss';

interface Props {
    post: AddNewPostResponse;
    setIsVisibleComments: Dispatch<SetStateAction<{ [postId: number]: boolean }>>;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
}

export const PostIcons = ({ post, setIsVisibleComments, setAllPosts }: Props) => {
    const [toggleLike] = postApi.useToggleLikeMutation();

    const handleLike = () => {
        setAllPosts((prev) =>
            prev.map((p) =>
                p.id === post.id
                    ? {
                          ...p,
                          isLiked: !post.isLiked,
                          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
                      }
                    : p,
            ),
        );
        toggleLike({ id: post.id });
    };

    return (
        <div className={cls.icons}>
            <div className={cls.content}>
                {post.isLiked ? (
                    <HeartFilled className={cls.like} onClick={handleLike} />
                ) : (
                    <HeartOutlined className={cls.like} onClick={handleLike} />
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
