import { useEffect, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { postApi } from '../../api/posts';
import { POST_COMMENT_COUNT } from '../../models/constants';
import { GetPostsResponse } from '../../models/types';
import { Post } from '../Post';

import cls from './index.module.scss';

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    allPosts: GetPostsResponse;
    setAllPosts: React.Dispatch<React.SetStateAction<GetPostsResponse>>;
}

export const PostsList = ({ page, setPage, allPosts, setAllPosts }: Props) => {
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        offset: page * POST_COMMENT_COUNT,
        limit: POST_COMMENT_COUNT,
    });

    useEffect(() => {
        if (posts) {
            setAllPosts((prev) => {
                const uniquePostId = new Set(prev.map((post) => post.id));
                const newPosts = posts.filter((post) => !uniquePostId.has(post.id));
                return [...prev, ...newPosts];
            });
        }
    }, [posts, page]);

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: allPosts?.length,
        getScrollElement: () => parentRef.current,
        onChange(instance) {
            if (posts && posts?.length === 0) return;
            const items = instance.getVirtualItems();
            const lastItem = items.at(-1);

            if (lastItem && lastItem.index >= allPosts.length - 3) {
                setPage((prev) => prev + 1);
            }
        },
        estimateSize: () => 260,
        gap: 20,
    });

    const goTop = () => {
        rowVirtualizer.scrollToIndex(0, { behavior: 'smooth', align: 'start' });
    };

    return (
        <>
            <div className={cls.scrollable} ref={parentRef}>
                <div
                    className={cls.itemsContainer}
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const post = allPosts?.[virtualRow.index];
                        if (!post) return;
                        return (
                            <div
                                className={cls.item}
                                key={virtualRow.key}
                                style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}>
                                <Post post={post} isLoading={isLoading} setAllPosts={setAllPosts} />
                            </div>
                        );
                    })}
                </div>
                {
                    <p onClick={goTop} className={cls.toTop}>
                        Все посты прочитаны. <br /> Подняться наверх.
                    </p>
                }
            </div>
        </>
    );
};
