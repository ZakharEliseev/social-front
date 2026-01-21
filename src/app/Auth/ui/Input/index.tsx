import { FC } from 'react';

import { Input as AntdInput} from 'antd';
import { Controller } from 'react-hook-form';


import cls from './index.module.scss';


interface Props {
    name: string;
    placeholder?: string;
    control: any;
    label: string;
    errors: any;
}
export const Input: FC<Props> = ({ name, placeholder, control, errors, label }) => {

    return (
        <div className={cls.formField}>
            <label className={cls.fieldName} htmlFor={name}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <AntdInput className={cls.inputField} {...field} placeholder={placeholder} />
                )}
            />
            {errors[name] && <span className={cls.danger}>{errors}</span>}
        </div>
    );
};
