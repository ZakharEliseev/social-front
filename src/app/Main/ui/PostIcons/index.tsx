import React from 'react';

import { HeartFilled, HeartOutlined, MessageFilled, MessageOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { AddNewPostResponse, GetPostsResponse } from '../../models/types';

import cls from './index.module.scss';

interface Props {
    post: AddNewPostResponse;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPost: React.Dispatch<React.SetStateAction<number | null>>;
}

export const PostIcons = ({ post, setAllPosts, setModalIsOpen, setCurrentPost }: Props) => {
    const [toggleLike] = postApi.useToggleLikeMutation();

    const handleLike = async () => {
        await toggleLike({ id: post.id });
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
    };

    const openModal = () => {
        setModalIsOpen((prev) => !prev);
        setCurrentPost(post.id);
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
            <div className={cls.content} onClick={openModal}>
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
