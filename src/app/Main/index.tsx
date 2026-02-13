import { useState } from 'react';

import { Navbar } from '@/shared/ui';

import { postApi } from './api/posts';
import { POST_COMMENT_COUNT } from './models/constants';
import { GetPostsResponse } from './models/types';
import { AddPostForm } from './ui/Form/AddPost';
import { PostsList } from './ui/PostList';

import cls from './index.module.scss';

const MainPage = () => {
    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(1);
    const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
        page: page,
        limit: POST_COMMENT_COUNT,
    });

    const onSuccess = () => {
        setAllPosts([]);
        setPage(1);
    };
    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <AddPostForm onSuccess={onSuccess} />
            </div>
            br
            <div className={cls.content}>
                <PostsList
                    posts={posts}
                    isLoading={isLoading}
                    allPosts={allPosts}
                    page={page}
                    setPage={setPage}
                    setAllPosts={setAllPosts}
                />
            </div>
        </>
    );
};

export default MainPage;
