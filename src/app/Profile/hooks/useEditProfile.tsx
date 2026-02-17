import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { userApi } from '../api/users';
import { editProfileSchema } from '../models/constants';

type EditProfileFormValues = {
    email: string;
    bio: string;
};

export const useEditProfile = () => {
    const methods = useForm<EditProfileFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(editProfileSchema),
    });
    const navigate = useNavigate();
    const [updateProfile] = userApi.useUpdateProfileMutation();

    const onSubmit = methods.handleSubmit(async ({ email, bio }: EditProfileFormValues) => {
        try {
            updateProfile({ email, bio });
            navigate(-1);
        } catch (err: any) {
            methods.setError('root', { message: err.data.message });
        }
    });

    return { methods, onSubmit };
};
