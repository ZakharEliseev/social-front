import { useState } from 'react';

import { Navbar } from '@/shared/ui';

import { GetPostsResponse } from './models/types';
import { AddPostForm } from './ui/Form/AddPost';
import { PostVirtualizer } from './ui/PostVirtualizer';

import cls from './index.module.scss';

const MainPage = () => {
    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(0);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <AddPostForm
                    onSuccess={() => {
                        setAllPosts([]);
                        setPage(0);
                    }}
                />
                <PostVirtualizer
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
