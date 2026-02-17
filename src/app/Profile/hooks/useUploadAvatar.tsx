import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { userApi } from '../api/users';

type UpdateAvatarValue = {
    avatar: File;
};

export const useUpdateAvatar = () => {
    const methods = useForm<UpdateAvatarValue>({
        mode: 'onSubmit',
    });

    const navigate = useNavigate();
    const [uploadAvatar] = userApi.useUploadAvatarMutation();
    const [deleteAvatar] = userApi.useDeleteAvatarMutation();

    const handleUpload = methods.handleSubmit(async ({ avatar }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            await uploadAvatar(formData).unwrap();
            navigate(-1);
        } catch (err: any) {
            methods.setError('root', { message: err.data.message });
        }
    });

    const handleDelete = async () => {
        try {
            await deleteAvatar().unwrap();
            navigate(-1);
        } catch (err: any) {
            methods.setError('root', { message: err.data.message });
        }
    };

    return { methods, handleUpload, handleDelete };
};
