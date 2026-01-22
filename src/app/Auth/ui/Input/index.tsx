import { FC } from 'react';

import { Input as AntdInput } from 'antd';
import { useController } from 'react-hook-form';

import cls from './index.module.scss';

interface Props {
    name: string;
    placeholder?: string;
    control: any;
    label: string;
    error: string | undefined;
}

export const Input: FC<Props> = ({ name, control, error, label }) => {
    const { field } = useController({
        name,
        control,
    });

    return (
        <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor={name}>
                {label}
            </label>
            <AntdInput className={cls.input} {...field} />
            {error && <span className={cls.errorMessage}>{error}</span>}
        </div>
    );
};
