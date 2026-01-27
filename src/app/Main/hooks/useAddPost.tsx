import { useController, useForm } from 'react-hook-form';

import { socialApi } from '@/app/api';

export type PostFormValues = {
    title: string;
    text: string;
};

export const useAddPost = () => {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<PostFormValues>({
        defaultValues: { text: '', title: ' ', },
        mode: 'onSubmit',
    });

    
    const { field, fieldState } = useController({
        name: 'text',
        control,
        rules: { required: 'Поле не может быть пустым' },
    });

    const [addNewPost] = socialApi.useAddNewPostMutation();

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
