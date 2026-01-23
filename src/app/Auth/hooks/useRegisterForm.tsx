import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useRegisterMutation } from '@/shared/services/HttpService';
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

    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async ({ username, email, password }: RegisterFormValues) => {
        try {
            await register({username, email, password});
            navigate('/login');
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
