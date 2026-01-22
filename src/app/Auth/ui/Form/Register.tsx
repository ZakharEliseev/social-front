import { FC } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router';

import { useRegisterForm } from '../../hooks/useRegisterForm';
import { Input } from '../Input';

import cls from './index.module.scss';

export const RegisterForm: FC = () => {
    const { control, errors, onSubmit } = useRegisterForm();

    return (
        <form className={cls.formAuth} onSubmit={onSubmit}>
            <Input
                name="username"
                control={control}
                placeholder="Введите имя пользователя"
                label="Имя пользователя"
                error={errors.username?.message}
            />
            <Input
                name="email"
                control={control}
                placeholder="Введите email"
                label="Email"
                error={errors.email?.message}
            />
            <Input
                name="password"
                control={control}
                placeholder="Введите пароль"
                label="Введите пароль"
                error={errors.password?.message}
            />
            <Input
                name="confirmPassword"
                control={control}
                placeholder="Подтвердите пароль"
                label="Подтвердите пароль"
                error={errors.confirmPassword?.message}
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
                <Link className={cls.link} to={'/login'}>
                    <span className={cls.boldLink}>Войти</span>
                </Link>
            </p>
        </form>
    );
};
