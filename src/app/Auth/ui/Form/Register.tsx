import { FC } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router';

import { useRegisterForm } from '../../hooks/useRegisterForm';

import { InputField } from './InputField';

import cls from './index.module.scss';

export const RegisterForm: FC = () => {
    const { control, errors, onSubmit } = useRegisterForm();

    return (
        <form className={cls.formAuth} onSubmit={onSubmit}>
            <InputField
                name="username"
                control={control}
                placeholder="Введите имя пользователя"
                label="Имя пользователя"
                errors={errors}
            />
            <InputField
                name="email"
                control={control}
                placeholder="Введите email"
                label="Email"
                errors={errors}
            />
            <InputField
                name="password"
                control={control}
                placeholder="Введите пароль"
                label="Введите пароль"
                errors={errors}
            />
            {/* Только для валдиции, на сервер не отправляетя? */}
            <InputField
                name="confirmPassword"
                control={control}
                placeholder="Подтвердите пароль"
                label="Подтвердите пароль"
                errors={errors}
            />
                <Button
                    className={cls.btn}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid">
                    Зарегистрироваться
                </Button>
            <p className={cls.register}>
                Уже есть аккаунт?{' '}
                <Link className={cls.link} to={'/register'}>
                    <span className={cls.boldLink}>Войти</span>
                </Link>
            </p>
        </form>
    );
};
