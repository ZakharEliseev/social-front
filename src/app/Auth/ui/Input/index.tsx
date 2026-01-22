import { FC } from 'react';

import { Input as AntdInput } from 'antd';
import { useController } from 'react-hook-form';

import { AllFormFields } from '../../models/schemas';

import cls from './index.module.scss';


interface Props {
    name: keyof AllFormFields;
    placeholder?: string;
    control: any;
    label: string;
    errors?: string;
}

export const Input: FC<Props> = ({ name, control, errors, label }) => {
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
            {errors && <span className={cls.errorMessage}>{errors}</span>}
        </div>
    );
};
