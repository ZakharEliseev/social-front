import { useForm } from 'react-hook-form';

import { postApi } from '@/app/api/posts';
import { yupResolver } from '@hookform/resolvers/yup';

import { addPostSchema } from '../validations/addPostSchema';

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
            const response = await addNewPost(formData).unwrap();
            console.warn('>>', response);
            methods.reset();
        } catch (err: any) {
            console.error('>>', err);
        }
    });

    return {
        methods,
        onSubmit,
    };
};
