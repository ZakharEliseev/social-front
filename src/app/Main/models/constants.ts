import * as yup from 'yup';

export const addPostSchema = yup.object({
    text: yup
        .string()
        .min(10, 'Пост должен состоять минимум из 10 символов')
        .max(1000, 'Пост не должен превышать 1000 символов')
        .required('Поле обязательно')
        .trim(),
});

export const addCommentSchema = yup.object({
    text: yup
        .string()
        .min(10, 'Комментарий должен состоять минимум из 10 символов')
        .max(100, 'Комментарий не должен превышать 100 символов')
        .required('Поле обязательно')
        .trim(),
});
