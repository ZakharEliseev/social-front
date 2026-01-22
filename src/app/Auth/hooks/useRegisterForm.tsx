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
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
        mode: 'onBlur',
    });

    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = handleSubmit(async ({ confirmPassword, ...data }: RegisterFormValues) => {
        try {
            const response = await register(data).unwrap();
            console.warn('>>', response);
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
