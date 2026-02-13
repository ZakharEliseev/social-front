import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

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
    return { methods };
};
