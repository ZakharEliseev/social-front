import { useController, useForm } from 'react-hook-form';

import { postApi } from '@/app/api/posts';

export type PostFormValues = {
    title: string;
    text: string;
};

export const useAddPost = () => {
    const { control, handleSubmit, reset } = useForm<PostFormValues>({
        defaultValues: { text: '' },
        mode: 'onSubmit',
    });

    const { field, fieldState } = useController({
        name: 'text',
        control,
        rules: { required: 'Поле не может быть пустым' },
    });

    const [addNewPost] = postApi.useAddNewPostMutation();

    const onSubmit = handleSubmit(async (formData: PostFormValues) => {
        try {
            const response = await addNewPost(formData).unwrap();
            console.warn('>>', response);
            reset();
        } catch (err: any) {
            console.error('>>', err);
        }
    });

    return {
        field,
        fieldState,
        onSubmit,
    };
};
