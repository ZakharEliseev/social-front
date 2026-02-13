import { useForm } from 'react-hook-form';

import { postApi } from '@/app/Main/api/posts';
import { yupResolver } from '@hookform/resolvers/yup';

import { addPostSchema } from '../models/constants';

type PostFormValues = {
    text: string;
};

export const useAddPost = (onSuccess?: () => void) => {
    const methods = useForm<PostFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
        resolver: yupResolver(addPostSchema),
    });

    const [addNewPost] = postApi.useAddNewPostMutation();

    const onSubmit = methods.handleSubmit(async (formData: PostFormValues) => {
        await addNewPost(formData).unwrap();
        methods.reset();
        onSuccess?.();
    });

    return {
        methods,
        onSubmit,
    };
};
