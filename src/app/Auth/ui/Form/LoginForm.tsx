import { FC } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router';

import { useLoginForm } from '../../hooks/useLoginForm';

import { InputField } from './InputField';

import cls from './index.module.scss';

export const LoginForm: FC = () => {

    const { control, handleSubmit, errors, onSubmit } = useLoginForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name="email"
                control={control}
                rules={{ required: true }}
                placeholder="Введите email"
                labelText="Электронная почта"
                errors={errors}
            />
            <InputField
                name="password"
                control={control}
                rules={{ required: true }}
                placeholder="Введите пароль"
                labelText="Пароль"
                errors={errors}
            />
            <div>
                <Button
                    className={cls.btn}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid">
                    Войти
                </Button>
            </div>
            <p className={cls.register}>
                Нет аккаунта?{' '}
                <Link to={'/register'}>
                    <span>Зарегистрироваться</span>
                </Link>
            </p>
        </form>
    );
};
