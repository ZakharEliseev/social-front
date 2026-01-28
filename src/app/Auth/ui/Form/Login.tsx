import { FC } from 'react';

import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import { useLoginForm } from '../../hooks/useLoginForm';
import { Input } from '../Input';

import cls from './index.module.scss';

export const LoginForm: FC = () => {
    const { methods, onSubmit } = useLoginForm();

    return (
        <FormProvider {...methods}>
            <form className={cls.formAuth} onSubmit={onSubmit}>
                <p className={cls.errorMessage}>{methods.formState.errors.root?.message}</p>
                <Input name="email" placeholder="Введите email" label="Электронная почта" />
                <Input name="password" placeholder="Введите пароль" label="Пароль" />
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
        </FormProvider>
    );
};
