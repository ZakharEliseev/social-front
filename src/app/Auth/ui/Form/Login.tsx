import { FC } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router';

import { useLoginForm } from '../../hooks/useLoginForm';
import { Input } from '../Input';

import cls from './index.module.scss';

export const LoginForm: FC = () => {
    const { control, errors, onSubmit } = useLoginForm();

    return (
        <form className={cls.formAuth} onSubmit={onSubmit}>
            <p className={cls.errorMessage}>{errors.root?.message}</p>
            <Input
                name="email"
                control={control}
                placeholder="Введите email"
                label="Электронная почта"
                error={errors.email?.message}
            />
            <Input
                name="password"
                control={control}
                placeholder="Введите пароль"
                label="Пароль"
                error={errors.password?.message}
            />
            <Button
                className={cls.btn}
                type="primary"
                htmlType="submit"
                color="default"
                variant="solid">
                Войти
            </Button>
            <p className={cls.register}>
                Нет аккаунта?{' '}
                <Link className={cls.link} to={'/register'}>
                    Зарегистрироваться
                </Link>
            </p>
        </form>
    );
};
