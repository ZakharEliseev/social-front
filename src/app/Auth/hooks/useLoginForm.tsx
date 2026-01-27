import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { authApi } from '@/app/api/auth';
import { RoutePath } from '@/routes/config';
import { useAppDispatch } from '@/store/hooks';
import { setUserData } from '@/store/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '../validations/loginSchema';

export type LoginFormValues = {
    email: string;
    password: string;
};

const defaultValues = {
    email: 'bob@example.com',
    password: 'password123',
};

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

    const [login] = authApi.useLoginMutation();
    const [getUserProfile] = authApi.useLazyGetUserProfileQuery();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (authData: LoginFormValues) => {
        try {
            const response = await login(authData).unwrap();
            localStorage.setItem('token', response.accessToken);

            const { data: profileData } = await getUserProfile();

            if (profileData) {
                dispatch(setUserData(profileData));
            }

            navigate(RoutePath.feed());
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
