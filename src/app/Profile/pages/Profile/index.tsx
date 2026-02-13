import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { postApi } from '@/app/Main/api/posts';
import { POST_COMMENT_COUNT } from '@/app/Main/models/constants';
import { GetPostsResponse } from '@/app/Main/models/types';
import { PostsList } from '@/app/Main/ui/PostList';
import { userApi } from '@/app/Search/api/users';
import { User } from '@/app/Search/ui/User';
import { Navbar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import cls from './index.module.scss';

export const Profile = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);

    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(1);

    const { id } = useParams<{ id: string }>();

    const { data: user } = userApi.useGetUserProfileByIdQuery({
        userId: Number(id),
    });


    const { data: posts, isLoading: loadUserPost } = postApi.useGetPostsByIdQuery(
        {
            userId: Number(id),
            params: { page, limit: POST_COMMENT_COUNT },
        },
        { skip: currentUser?.id === Number(id) },
    );

    const { data: myPosts, isLoading: loadMyPost } = postApi.useGetMyPostsQuery(
        {
            page,
            limit: POST_COMMENT_COUNT,
        },
        { skip: currentUser?.id !== Number(id) },
    );
    
    useEffect(() => {
        const newPosts = currentUser?.id === user?.id ? myPosts : posts;

        if (newPosts) {
            setAllPosts(newPosts);
        }
    }, [user?.id]);

    if (!user) return <div>Загрузка профиля</div>;

    return (
        <>
            <Navbar />
            <div className={cls.userCard}>
                <User user={user} />
            </div>
            <h2 className={cls.subHeader}>Посты</h2>
            <div className={cls.content}>
                <PostsList
                    isLoading={currentUser?.id === user.id ? loadMyPost : loadUserPost}
                    posts={currentUser?.id === user.id ? myPosts : posts}
                    allPosts={allPosts}
                    page={page}
                    setPage={setPage}
                    setAllPosts={setAllPosts}
                />
            </div>
        </>
    );
};

export default Profile;
