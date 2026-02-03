import { useState } from 'react';

import { Navbar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import { GetPostsResponse } from './models/types/constants';
import { AddPostForm } from './ui/Form/AddPost';
import { PostsList } from './ui/PostList';

import cls from './index.module.scss';

const MainPage = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(0);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <AddPostForm
                    onPostAdded={() => {
                        setPage(0);
                        setAllPosts([]); 
                    }}
                    currentUser={currentUser}
                />
                <PostsList
                    page={page}
                    setPage={setPage}
                    allPosts={allPosts}
                    setAllPosts={setAllPosts}
                    currentUser={currentUser}
                />
            </div>
        </>
    );
};

export default MainPage;
