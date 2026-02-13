import * as yup from 'yup';

export const searchUsersSchema = yup.object({
    text: yup
        .string()
        .min(3, 'Имя пользователя должно состоять минимум из 3 символов')
        .max(15, 'Имя пользователя не должно превышать 15 символов')
        .required('Поле обязательно')
        .trim(),
});

export interface GetUsersRequest {
    username: string;
}

