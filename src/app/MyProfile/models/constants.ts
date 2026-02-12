import * as yup from 'yup';

export const editProfileSchema = yup.object({
username: yup
        .string()
        .min(6, 'Имя пользователя должно состоять минимум из 6 символов')
        .required('Имя пользователя должно быть заполнено'),
    email: yup
        .string()
        .email('Некорректный формат email')
        .min(6, 'Email должен состоять минимум из 6 символов')
        .required('Email обязателен'),
});

