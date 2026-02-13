import { useState } from 'react';

import { postApi } from '@/app/Main/api/posts';
import { POST_COMMENT_COUNT } from '@/app/Main/models/constants';
import { GetPostsResponse } from '@/app/Main/models/types';
import { PostsList } from '@/app/Main/ui/PostList';
import { User } from '@/app/Search/ui/User';
import { Navbar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import cls from './index.module.scss';

export const MyProfile = () => {
    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(1);
    const currentUser = useAppSelector((state) => state.profile.profile);
    if (!currentUser) return;
    const { data: posts, isLoading } = postApi.useGetPostsByIdQuery({
        userId: currentUser?.id,
        params: {
        page: page,
        limit: POST_COMMENT_COUNT,
    }});

    return (
        <>
            <Navbar />
            <div className={cls.userCard}>
                <User user={currentUser} />
            </div>
            <h2 className={cls.subHeader}>Посты</h2>
            <div className={cls.content}>
                <PostsList
                    isLoading={isLoading}
                    posts={posts}
                    allPosts={allPosts}
                    page={page}
                    setPage={setPage}
                    setAllPosts={setAllPosts}
                />
            </div>
        </>
    );
};

export default MyProfile;
