import * as yup from 'yup';

export const loginSchema = yup.object({
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
});