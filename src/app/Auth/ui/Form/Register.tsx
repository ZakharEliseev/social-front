import { FC } from 'react';

import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import Input from '@/shared/ui/Controlled/Input';
import { LockOutlined } from '@ant-design/icons';


import { useRegisterForm } from '../../hooks/useRegisterForm';

import cls from './index.module.scss';

export const RegisterForm: FC = () => {
    const { methods, onSubmit } = useRegisterForm();

    return (
        <FormProvider {...methods}>
            <form className={cls.formAuth} onSubmit={onSubmit}>
                <Input
                    name="username"
                    placeholder="Введите имя пользователя"
                    label="Имя пользователя"
                    type="text"
                />
                <Input name="email" placeholder="Введите email" label="Email" type="email" />
                <Input
                    name="password"
                    placeholder="Введите пароль"
                    label="Введите пароль"
                    type="password"
                    suffix={<LockOutlined />}
                />
                <Input
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    label="Подтвердите пароль"
                    type="password"
                    suffix={<LockOutlined />}
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
                        Войти
                    </Link>
                </p>
            </form>
        </FormProvider>
    );
};
