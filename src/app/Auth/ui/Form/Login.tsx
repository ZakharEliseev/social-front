import { FC } from 'react';

import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import Input from '@/shared/ui/Controlled/Input';
import { LockOutlined } from '@ant-design/icons';

import { useLoginForm } from '../../hooks/useLoginForm';

import cls from './index.module.scss';


export const LoginForm: FC = () => {
    const { methods, onSubmit } = useLoginForm();

    return (
        <FormProvider {...methods}>
            <form className={cls.formAuth} onSubmit={onSubmit}>
                <p className={cls.errorMessage}>{methods.formState.errors.root?.message}</p>
                <Input
                    name="email"
                    placeholder="Введите email"
                    label="Электронная почта"
                    type="email"
                />
                <Input
                    name="password"
                    placeholder="Введите пароль"
                    label="Пароль"
                    type="password"
                    suffix={<LockOutlined />}
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
                    <Link className={cls.link} to={'/registration'}>
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </FormProvider>
    );
};
