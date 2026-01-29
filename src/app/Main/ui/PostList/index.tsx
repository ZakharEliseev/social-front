import { useState } from 'react';

import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/api/types/models';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import {
    DeleteOutlined,
    HeartFilled,
    HeartOutlined,
    MessageFilled,
    MessageOutlined,
} from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { useAddLikePost } from '../../hooks/useAddLikePost';
import { useDeletePost } from '../../hooks/useDeletePost';
import { CommentList } from '../Form/CommentList';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const PostsList = ({ currentUser }: Props) => {
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: 0,
        limit: 100,
    });
    const { handleDelete } = useDeletePost();
    const { handleLike } = useAddLikePost();
    const [isVisible, setIsVisible] = useState<Boolean>(false);

    if (isLoading) return <div>Загрузка постов</div>;
    return (
        <>
            {posts?.map((post) => (
                <div key={post.id} className={cls.postList}>
                    <div className={cls.postItemHeader}>
                        <div className={cls.userInfo}>
                            <Avatar username={currentUser?.username} />
                            <div className={cls.author}>
                                <p className={cls.username}>{currentUser?.username}</p>
                                <p className={cls.createdAt}>
                                    {dateService.formatRelative(currentUser?.createdAt)}
                                </p>
                            </div>
                        </div>
                        <DeleteOutlined onClick={() => handleDelete(post.id)} />
                    </div>
                    <p className={cls.text}>{post.text}</p>
                    <Divider />
                    <div className={cls.icons}>
                        <div className={cls.iconWrap}>
                            {post.isLiked ? (
                                <HeartFilled
                                    className={cls.like}
                                    onClick={() => handleLike(post.id)}
                                />
                            ) : (
                                <HeartOutlined
                                    onClick={() => handleLike(post.id)}
                                    className={cls.notLike}
                                />
                            )}
                            {post.likesCount}
                        </div>
                        <div className={cls.iconWrap} onClick={() => setIsVisible(!isVisible)}>
                            {post.comments?.length ? (
                                <MessageFilled className={cls.comment} />
                            ) : (
                                <MessageOutlined className={cls.comment} />
                            )}
                            {post.comments?.length}
                        </div>
                    </div>
                    <Divider />
                    <CommentList
                        postId={post.id}
                        commentList={post.comments}
                        isVisible={isVisible}
                    />
                </div>
            ))}
        </>
    );
};
