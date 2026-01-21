import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type FieldType = {
    username: string;
    email: string;
    password: string;
};

export const useRegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldType>();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data: FieldType) => {
        try {
            const response = await axios.post('/api/v1/auth/register', data);
            console.warn('>>', response);
            navigate('/')
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
