import { Navbar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import { AddPostForm } from './ui/Form/AddPost';
import { PostsList } from './ui/PostList';

import cls from './index.module.scss';

const MainPage = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <AddPostForm currentUser={currentUser} />
                <PostsList />
            </div>
        </>
    );
};

export default MainPage;
