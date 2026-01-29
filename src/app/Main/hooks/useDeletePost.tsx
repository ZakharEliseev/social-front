import { postApi } from '../api/posts';

export const useDeletePost = () => {
    const [deletePost] = postApi.useDeletePostMutation();

    const handleDelete = async (id: number) => {
        try {
            await deletePost({ id }).unwrap();
        } catch {
            return; // как правильно обработать? нужно ли спускать ошибку в компонент? конкретно в этом случае есть смысл?
        }
    };

    return { handleDelete };
};
