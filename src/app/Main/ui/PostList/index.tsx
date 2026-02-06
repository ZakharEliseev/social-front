import { useEffect, useRef, useState } from 'react';

import { Divider } from 'antd';

import { ProfileResponse } from '@/app/Auth/models/types';
import { dateService } from '@/shared/services/DateService';
import { Avatar } from '@/shared/ui';
import { DeleteOutlined } from '@ant-design/icons';
import { useVirtualizer } from '@tanstack/react-virtual';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT } from '../../models/constants';
import { GetPostsResponse } from '../../models/types';
import { CommentList } from '../CommentList';
import { PostIcons } from '../PostIcons';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    allPosts: GetPostsResponse;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
}

export const PostsList = ({ currentUser, page, setPage, allPosts, setAllPosts }: Props) => {
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: page * POST_COMMENT_COUNT,
        limit: POST_COMMENT_COUNT,
    });

        useEffect(() => {
            if (posts) {
                setAllPosts((prev) => [...prev, ...posts]);
            }
        }, [posts, page]);

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allPosts?.length,
        getScrollElement: () => parentRef.current,
        onChange(instance) {
            const items = instance.getVirtualItems();
            const lastItem = items[items.length - 1].index;

            if (!posts || posts?.length === 0) return;
            if (lastItem >= allPosts.length - 3) setPage((prev) => prev + 1)
        },
        estimateSize: () => 260,
        gap: 20,
    });

    const [deletePost] = postApi.useDeletePostMutation();
    const handleDelete = (postId: number) => {
        setAllPosts((prev) => prev.filter((p) => p.id !== postId));
        deletePost({ id: postId });
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<number | null>(null);

    if (isLoading) return <div>Загрузка постов</div>;

    return (
        <>
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
                                        <DeleteOutlined onClick={() => handleDelete(post.id)} />
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
                            </div>
                        );
                    })}
                </div>
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
