import { postApi } from '../api/posts';

export const useAddLikePost = () => {
    const [toggleLike] = postApi.useToggleLikeMutation();

    const handleLike = async (id: number) => {
        try {
            await toggleLike({ id }).unwrap();
        } catch {
            return; // как правильно обработать? нужно ли спускать ошибку в компонент? конкретно в этом случае есть смысл?
        }
    };
    return { handleLike };
};
