import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '@/shared/services/HttpService';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '../validations/loginSchema';

export type LoginFormValues = {
    email: string;
    password: string;
};

export const useLoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: 'user@example.com',
            password: 'SecurePass123!',
        },
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const [login] = useLoginMutation();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data: LoginFormValues) => {
        try {
            const response = await login(data).unwrap();
             response.accessToken && navigate('/');
        } catch (err: any) {
            const serverError = err.data.message;
             if (serverError === 'invalid_email') {
                 setError('email', { message: 'Пользователь не найден' });
             } else if (serverError === 'invalid_password') {
                 setError('password', { message: 'Неверный пароль' });
             } else {
                 setError('root', { message: 'Ошибка входа' });
             }
        }
    });

    return {
        control,
        errors,
        onSubmit,
    };
};