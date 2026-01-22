import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup
  .string()
  .min(6, 'Имя пользователя должно состоять минимум из 6 символов')
  .required('Имя пользователя должно быть заполнено'),
  email: yup
  .string()
  .email('Некорректный формат email')
  .min(6, 'Email должен состоять минимум из 6 символов')
  .required('Email обязателен'),
  password: yup
  .string()
  .min(6, 'Пароль должен состоять из минимум 6 уникальных символов')
  .matches(/[a-z]/, 'Нужна хотя бы одна строчная буква')
  .matches(/[A-Z]/, 'Нужна хотя бы одна заглавная буква')
  .matches(/[0-9]/, 'Нужна хотя бы одна цифра')
  .matches(/[!@#$%^&*]/, 'Нужен хотя бы один спецсимвол (@#$%^&*)')
  .required('Пароль обзяателен'),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref('password')], 'Пароли должны совпадать')
  .required('Повтор пороля обязателен'),
});