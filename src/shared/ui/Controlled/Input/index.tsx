import React, { FC } from 'react';

import { Input as AntdInput } from 'antd';
import { useController, useFormContext } from 'react-hook-form';

import cls from './index.module.scss';

export interface Props {
    name: string;
    placeholder?: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'tel' | 'number';
    suffix?: React.ReactNode;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined' | undefined;
}

export const Input: FC<Props> = ({ name, label, suffix, type, placeholder, variant }) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const InputElement = type === 'password' ? AntdInput.Password : AntdInput;

    return (
        <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor={name}>
                {label}
            </label>
            <InputElement
                className={cls.input}
                {...field}
                suffix={suffix}
                type={type}
                placeholder={placeholder}
                variant={variant}
            />
            {error && <span className={cls.errorMessage}>{error?.message}</span>}
        </div>
    );
};
