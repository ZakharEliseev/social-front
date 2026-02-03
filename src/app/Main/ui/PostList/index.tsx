import { useEffect, useRef, useState } from 'react';

import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/models/types/constants';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { DeleteOutlined } from '@ant-design/icons';
import { useVirtualizer } from '@tanstack/react-virtual';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT } from '../../models/constants';
import { GetPostsResponse } from '../../models/types/constants';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    allPosts: GetPostsResponse;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
    onCommentAdded?: () => void;
}

export const PostsList = ({
    currentUser,
    page,
    setPage,
    allPosts,
    setAllPosts,
    onCommentAdded,
}: Props) => {
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: page * POST_COMMENT_COUNT,
        limit: POST_COMMENT_COUNT,
    });

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allPosts?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 350,
        gap: 20,
    });
    const visibleVirtualItems = rowVirtualizer.getVirtualItems();
    const lastVisibleVirtualItem = visibleVirtualItems[visibleVirtualItems.length - 1]?.index;

    useEffect(() => {
        if (posts) {
            setAllPosts((prev) => [...prev, ...posts]);
        }
    }, [posts]);

    useEffect(() => {
        if (!posts || posts?.length === 0) return;
        if (lastVisibleVirtualItem >= allPosts?.length - 2) {
            setPage((prev) => prev + 1);
        }
    }, [rowVirtualizer.range?.endIndex]);

    const [deletePost] = postApi.useDeletePostMutation();
    const handleDelete = (postId: number) => {
        setAllPosts((prev) => prev.filter((p) => p.id !== postId));
        deletePost({ id: postId });
    };

    const [isVisibleComments, setIsVisibleComments] = useState<Record<number, boolean>>({});

    if (isLoading) return <div>Загрузка постов</div>;

    return (
        <div
            ref={parentRef}
            style={{
                height: `100vh`,
                overflow: 'auto',
                marginTop: '20px',
            }}>
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const post = allPosts?.[virtualRow.index];
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
                                            <p className={cls.username}>{currentUser?.username}</p>
                                            <p className={cls.createdAt}>
                                                {dateService.getRelative(currentUser?.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <DeleteOutlined onClick={() => handleDelete(post.id)} />
                                </div>
                                <p className={cls.text}>{post.text}</p>
                                <Divider />
                                <PostIcons
                                    setAllPosts={setAllPosts}
                                    post={post}
                                    setIsVisibleComments={setIsVisibleComments}
                                />
                                <Divider />
                                <CommentList
                                    onCommentAdded={onCommentAdded}
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
    );
};
