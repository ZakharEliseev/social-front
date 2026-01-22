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
            <Input
                name="email"
                control={control}
                placeholder="Введите email"
                label="Электронная почта"
                errors={errors.root?.message}
            />
            <Input
                name="password"
                control={control}
                placeholder="Введите пароль"
                label="Пароль"
                errors={errors.root?.message}
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
                    <span className={cls.boldLink}>Зарегистрироваться</span>
                </Link>
            </p>
        </form>
    );
};
