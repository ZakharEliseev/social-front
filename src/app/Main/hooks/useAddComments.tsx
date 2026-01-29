import { useForm } from 'react-hook-form';

import { commentApi } from '@/app/api/comment';
import { yupResolver } from '@hookform/resolvers/yup';

import { addCommentSchema } from '../validations/addCommentSchema';

interface CommentFormValues {
    text: string;
}
export const useAddComments = () => {
    const methods = useForm<CommentFormValues>({
        mode: 'onSubmit',
        resolver: yupResolver(addCommentSchema)
    });

    const [addNewComment] = commentApi.useAddNewCommentMutation();

    const onSubmit = methods.handleSubmit(async (formData : CommentFormValues) => {
        try {
            const response = await addNewComment(formData, id).unwrap()
        } catch {

        }
    })

    return {
        methods,
        onSubmit,
    };
};
