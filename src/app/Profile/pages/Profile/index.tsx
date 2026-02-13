import { useState } from 'react';

import { useParams } from 'react-router';

import { postApi } from '@/app/Main/api/posts';
import { POST_COMMENT_COUNT } from '@/app/Main/models/constants';
import { GetPostsResponse } from '@/app/Main/models/types';
import { PostsList } from '@/app/Main/ui/PostList';
import { userApi } from '@/app/Profile/api/users';
import { User } from '@/app/Search/ui/User';
import { GoBackBtn, Navbar } from '@/shared/ui';

import cls from './index.module.scss';

export const Profile = () => {
    const [allPosts, setAllPosts] = useState<GetPostsResponse>([]);
    const [page, setPage] = useState<number>(1);

    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);

    const { data: user } = userApi.useGetUserProfileByIdQuery({
        userId: numericId,
    });

    const { data: posts, isLoading } = postApi.useGetPostsByIdQuery({
        userId: numericId,
        params: { page, limit: POST_COMMENT_COUNT },
    });

    if (!user) return <div>Загрузка профиля</div>;

    return (
        <>
            <Navbar />
            <GoBackBtn />
            <div className={cls.userCard}>
                <User user={user} />
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

const WrappedProfile = () => {
    const { id } = useParams<{ id: string }>();
    return <Profile key={id} />;
};
export default WrappedProfile;
