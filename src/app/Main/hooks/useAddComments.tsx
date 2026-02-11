import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { postApi } from '../api/posts';
import { addCommentSchema } from '../models/constants';

interface CommentFormValues {
    text: string;
}

export const useAddComments = (postId: number, onSuccess?: () => void) => {
    const methods = useForm<CommentFormValues>({
        mode: 'onSubmit',
        resolver: yupResolver(addCommentSchema),
    });

    const [addNewComment] = postApi.useAddNewCommentMutation();

    const onSubmit = methods.handleSubmit(async (formData: CommentFormValues) => {
        await addNewComment({
            id: postId,
            text: formData.text,
        }).unwrap();
        methods.reset();
        onSuccess?.();
    });

    return {
        methods,
        onSubmit,
    };
};
