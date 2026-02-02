import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/models/types/constants';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { DeleteOutlined } from '@ant-design/icons';

import { usePostList } from '../../hooks/usePostList';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const PostsList = ({ currentUser }: Props) => {
    const {
        posts,
        deletePost,
        setIsVisibleComments,
        isVisibleComments,
        hidePosts,
        ref,
        isLoading,
    } = usePostList();

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
                        <DeleteOutlined onClick={() => deletePost({ id: post.id })} />
                    </div>
                    <p className={cls.text}>{post.text}</p>
                    <Divider />
                    <PostIcons post={post} setIsVisibleComments={setIsVisibleComments} />
                    <Divider />
                    <CommentList
                        setIsVisibleComments={setIsVisibleComments}
                        postId={post.id}
                        commentList={post.comments}
                        isVisibleComments={isVisibleComments[post.id]}
                    />
                    <div ref={ref}></div>
                </div>
            ))}
            <p className={cls.hidePosts} onClick={hidePosts}>
                Подняться наверх
            </p>
        </>
    );
};
