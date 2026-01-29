import * as yup from 'yup';

export const addCommentSchema = yup.object({
  text: yup
  .string()
  .min(10, 'Комментарий должен состоять минимум из 10 символов')
  .max(100, 'Комментарий не должен превышать 100 символов')
  .required('Поле обязательно')
  .trim(),
});