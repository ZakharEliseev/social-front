import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { editProfileSchema } from '../models/constants';

type EditProfileFormValues = {
    username: string;
    email: string;
    bio: string;
};

export const useEditProfile = () => {
    const methods = useForm<EditProfileFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(editProfileSchema),
    });
    return { methods };
};
