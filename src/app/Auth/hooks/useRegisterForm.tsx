import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { authApi } from '@/app/api/auth';
import { RoutePath } from '@/routes/config';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerSchema } from '../validations/registerSchema';

export type RegisterFormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const useRegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
        mode: 'onBlur',
    });

    const [register] = authApi.useRegisterMutation();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async ({ username, email, password }: RegisterFormValues) => {
        try {
            await register({ username, email, password });
            navigate(RoutePath.login());
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
