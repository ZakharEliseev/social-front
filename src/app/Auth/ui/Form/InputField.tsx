import { FC } from 'react';

import { Input } from 'antd';
import { Controller } from 'react-hook-form';

import cls from './index.module.scss';


interface InputFieldProps {
    name: string;
    placeholder?: string;
    control: any;
    labelText: string;
    rules: any;
    errors: any;
}

export const InputField: FC<InputFieldProps> = ({ name, placeholder, control, errors, labelText }) => {

    return (
        <div className={cls.formField}>
            <label htmlFor={name}>{labelText}</label>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} placeholder={placeholder} />}
            />
            {errors[name] && <span className={cls.danger}>Это поле обязательно</span>}
        </div>
    );
};
