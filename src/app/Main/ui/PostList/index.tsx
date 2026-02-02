import { useRef, useState } from 'react';

import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/models/types/constants';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { DeleteOutlined } from '@ant-design/icons';
import { useVirtualizer } from '@tanstack/react-virtual';

import { postApi } from '../../api/posts';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const PostsList = ({ currentUser }: Props) => {
    const [deletePost] = postApi.useDeletePostMutation();
    const [isVisibleComments, setIsVisibleComments] = useState<Record<number, boolean>>({});

    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: 0,
        limit: 5,
    });

    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: posts?.length!,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 350, //
    });

    if (isLoading) return <div>Загрузка постов</div>;

    return (
        <>
            <div
                ref={parentRef}
                style={{
                    height: `800PX`,
                    overflow: 'auto',
                }}>
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const post = posts?.[virtualRow.index];
                        if (!post) return;
                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}>
                                <div className={cls.postList}>
                                    <div className={cls.postItemHeader}>
                                        <div className={cls.userInfo}>
                                            <Avatar username={currentUser?.username} />
                                            <div className={cls.author}>
                                                <p className={cls.username}>
                                                    {currentUser?.username}
                                                </p>
                                                <p className={cls.createdAt}>
                                                    {dateService.getRelative(
                                                        currentUser?.createdAt,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <DeleteOutlined
                                            onClick={() => deletePost({ id: post.id })}
                                        />
                                    </div>
                                    <p className={cls.text}>{post.text}</p>
                                    <Divider />
                                    <PostIcons
                                        post={post}
                                        setIsVisibleComments={setIsVisibleComments}
                                    />
                                    <Divider />
                                    <CommentList
                                        setIsVisibleComments={setIsVisibleComments}
                                        postId={post?.id}
                                        commentList={post?.comments}
                                        isVisibleComments={isVisibleComments[post.id]}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
