import * as yup from 'yup';

export const addPostSchema = yup.object({
  text: yup
  .string()
  .min(10, 'Пост должен состоять минимум из 6 символов')
  .max(1000, 'Пост не должен превышать 1000 символов')
  .required('Поле обязательно')
  .trim(),
});