import { Divider } from 'antd';

import { ProfileResponse } from '@/app/api/types/models';
import DateService from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { HeartOutlined, LikeOutlined, MoreOutlined } from '@ant-design/icons';

import { useGetAllPosts } from '../../hooks/useGetAllPosts';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const PostsList = ({ currentUser }: Props) => {
    const { data: posts, isLoading } = useGetAllPosts();

    if (isLoading) return <div>Загрузка постов</div>;
    return (
        <>
            {posts?.map((post) => (
                <div className={cls.postList}>
                    <div className={cls.postItemHeader}>
                        <div className={cls.userInfo}>
                            <Avatar username={currentUser?.username} />
                            <div className={cls.author}>
                                <p>{currentUser?.username}</p>
                                <p>{DateService.formatRelative(currentUser?.createdAt)}</p>
                            </div>
                        </div>
                        <MoreOutlined />
                    </div>
                    <p className={cls.text}>{post.text}</p>
                    <Divider />
                    <div className={cls.icons}>
                        <HeartOutlined className={cls.heart} />
                        <LikeOutlined className={cls.like} />
                    </div>
                    <Divider />
                </div>
            ))}
        </>
    );
};
