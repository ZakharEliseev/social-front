import { useState } from 'react';

import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/models/types/constants';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { DeleteOutlined } from '@ant-design/icons';

import { postApi } from '../../api/posts';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const PostsList = ({ currentUser }: Props) => {
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: 0,
        limit: 100,
    });
    const [deletePost] = postApi.useDeletePostMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);

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
                                    {dateService.getRelative(currentUser?.createdAt)}
                                </p>
                            </div>
                        </div>
                        <DeleteOutlined onClick={() => deletePost({id: post.id})} />
                    </div>
                    <p className={cls.text}>{post.text}</p>
                    <Divider />
                    <PostIcons post={post} setIsVisible={setIsVisible} />
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
