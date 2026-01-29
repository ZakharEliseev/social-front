import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { postApi } from '../api/posts';
import { addCommentSchema } from '../models/constants';

interface CommentFormValues {
    text: string;
}

export const useAddComments = (postId: number) => {
    const methods = useForm<CommentFormValues>({
        mode: 'onSubmit',
        resolver: yupResolver(addCommentSchema),
    });

    const [addNewComment] = postApi.useAddNewCommentMutation();

    const onSubmit = methods.handleSubmit(async (formData: CommentFormValues) => {
        try {
            await addNewComment({
                id: postId,
                text: formData.text,
            }).unwrap();
            methods.reset();
        } catch {
            return; // тот же вопрос
        }
    });

    return {
        methods,
        onSubmit,
    };
};
