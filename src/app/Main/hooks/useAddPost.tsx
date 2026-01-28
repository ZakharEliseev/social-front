import { useForm } from 'react-hook-form';

import { postApi } from '@/app/api/posts';

export type PostFormValues = {
    title: string;
    text: string;
};

export const useAddPost = () => {
    const methods = useForm<PostFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
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
