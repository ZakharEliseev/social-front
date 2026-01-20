import { FC } from 'react';

import { Button } from 'antd';
import { Link } from 'react-router';

import { useRegisterForm } from '../../hooks/useRegisterForm';

import { InputField } from './InputField';

import cls from './index.module.scss';

export const RegisterForm: FC = () => {
    const { control, handleSubmit, errors, onSubmit } = useRegisterForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name="username"
                control={control}
                rules={{ required: true }}
                placeholder="Введите имя пользователя"
                labelText="Имя пользователя"
                errors={errors}
            />
            <InputField
                name="email"
                control={control}
                rules={{ required: true }}
                placeholder="Введите email"
                labelText="Email"
                errors={errors}
            />
            <InputField
                name="password"
                control={control}
                rules={{ required: true }}
                placeholder="Введите пароль"
                labelText="Введите пароль"
                errors={errors}
            />
            {/* Только для валдиции, на сервер не отправляетя? */}
            <InputField
                name="confirmPassword"
                control={control}
                rules={{ require: true }}
                placeholder="Подтвердите пароль"
                labelText="Подтвердите пароль"
                errors={errors}
            />
            <div>
                <Button
                    className={cls.btn}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid">
                    Зарегистрироваться
                </Button>
            </div>
            <p className={cls.register}>
                Уже есть аккаунт?{' '}
                <Link to={'/register'}>
                    <span>Войти</span>
                </Link>
            </p>
        </form>
    );
};
