import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '@/shared/services/HttpService';

export type FormFields = {
    email?: string;
    username?: string;
    password?: string;
};

export const useLoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>();

    const [ login ] = useLoginMutation();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data: FormFields) => {
        try {
            const response = await login(data).unwrap();
            console.warn('>>', response)
            localStorage.setItem('token', response.accessToken);
            response && navigate('/');
        } catch (err) {
            console.error('>>', err);
        }
    });

    return {
        control,
        errors,
        onSubmit,
    };
};
