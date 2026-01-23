import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '@/shared/services/HttpService';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '../validations/loginSchema';

export type LoginFormValues = {
    email: string;
    password: string;
};

const defaultValues = {
            email: 'user@example.com',
            password: 'SecurePass123!',
        }

export const useLoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormValues>({
        defaultValues: defaultValues,
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const [login] = useLoginMutation();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data: LoginFormValues) => {
        try {
            const response = await login(data).unwrap();
            localStorage.setItem('token', response.accessToken);
            navigate('/');
        } catch (err: any) {
            setError('root', { message: err.data.message });
        }
    });

    return {
        control,
        errors,
        onSubmit,
    };
};
