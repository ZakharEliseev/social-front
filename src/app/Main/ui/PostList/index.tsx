import { useGetAllPosts } from '../../hooks/useGetAllPosts';

import cls from './index.module.scss';

export const PostsList = () => {
    const { data: posts, isLoading } = useGetAllPosts();

    if (isLoading) return <div className={cls.loadPosts}>Загрузка постов</div>
    return (
        <div className={cls.postList}>
        {posts?.map((post) => (
          post.text
        ))}
        </div>
    );};
