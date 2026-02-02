import { useForm } from 'react-hook-form';

import { postApi } from '@/app/Main/api/posts';
import { yupResolver } from '@hookform/resolvers/yup';

import { addPostSchema } from '../models/constants';

export type PostFormValues = {
    text: string;
};

export const useAddPost = () => {
    const methods = useForm<PostFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
        resolver: yupResolver(addPostSchema),
    });

    const [addNewPost] = postApi.useAddNewPostMutation();

    const onSubmit = methods.handleSubmit(async (formData: PostFormValues) => {
        try {
            await addNewPost(formData).unwrap();
            methods.reset();
        } catch {
            return;
        }
    });

    return {
        methods,
        onSubmit,
    };
};
