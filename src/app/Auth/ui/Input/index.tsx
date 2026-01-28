import { FC } from 'react';

import { Input as AntdInput } from 'antd';
import { useController, useFormContext } from 'react-hook-form';

import cls from './index.module.scss';

interface Props {
    name: string;
    placeholder?: string;
    label: string;
}

export const Input: FC<Props> = ({ name, label }) => {

    const { control } = useFormContext();
    const { field, fieldState: {error} } = useController({
        name,
        control,
    });

    return (
        <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor={name}>
                {label}
            </label>
            <AntdInput className={cls.input} {...field} />
            {error && <span className={cls.errorMessage}>{error?.message}</span>}
        </div>
    );
};
