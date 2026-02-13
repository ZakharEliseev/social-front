import { useState } from 'react';

import { Divider } from 'antd';
import { NavLink } from 'react-router';

import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';
import { DeleteOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { AddNewPostResponse, GetPostsResponse } from '../../models/types';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    post: AddNewPostResponse;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
    isLoading: boolean;
}

export const Post = ({ post, setAllPosts, isLoading }: Props) => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    const [deletePost] = postApi.useDeletePostMutation();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<number | null>(null);

    const handleDelete = (postId: number) => {
        setAllPosts((prev) => prev.filter((p) => p.id !== postId));
        deletePost({ id: postId });
    };

    if (isLoading) return <div>Загрузка постов</div>;

    return (
        <>
            <div className={cls.postList}>
                <div className={cls.postItemHeader}>
                    <div className={cls.userInfo}>
                        <NavLink to={`/users/${post.author.id}`} className={cls.link}>
                            <Avatar username={post.author.username} />
                        </NavLink>
                        <div className={cls.author}>
                            <NavLink to={`/users/${post.author.id}`} className={cls.link}>
                                <p className={cls.username}>{post.author.username}</p>
                            </NavLink>
                            <p className={cls.createdAt}>
                                {dateService.getRelative(post.createdAt)}
                            </p>
                        </div>
                    </div>
                    {currentUser?.id === Number(post?.author.id) ? (
                        <DeleteOutlined onClick={() => handleDelete(post.id)} />
                    ) : (
                        ''
                    )}
                </div>
                <p className={cls.text}>{post.text}</p>
                <Divider />
                <PostIcons
                    setCurrentPost={setCurrentPost}
                    setModalIsOpen={setModalIsOpen}
                    setAllPosts={setAllPosts}
                    post={post}
                />
                <Divider />
            </div>
            {currentPost && (
                <CommentList
                    setAllPosts={setAllPosts}
                    setModalIsOpen={setModalIsOpen}
                    modalIsOpen={modalIsOpen}
                    postId={currentPost}
                />
            )}
        </>
    );
};
