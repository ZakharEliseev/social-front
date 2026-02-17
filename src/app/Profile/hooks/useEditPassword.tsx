import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';

import { userApi } from '../api/users';
import { editPasswordSchema } from '../models/constants';

type EditPasswordFormValues = {
    currentPassword: string;
    newPassword: string;
};

export const useEditPassword = () => {
    const methods = useForm<EditPasswordFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(editPasswordSchema),
    });

    const navigate = useNavigate();
    const [updatePassword] = userApi.useUpdatePasswordMutation();

    const onSubmit = methods.handleSubmit(
        async ({ currentPassword, newPassword }: EditPasswordFormValues) => {
            try {
                updatePassword({ currentPassword, newPassword });
                navigate(-1);
            } catch (err: any) {
                methods.setError('root', { message: err.data.message });
            }
        },
    );

    return { methods, onSubmit };
};
