import { Input } from 'antd';
import { useController, useFormContext } from 'react-hook-form';

import cls from './index.module.scss';

export interface TextAreaProps {
    name: string;
    placeholder?: string;
    autoSize?: { minRows: number; maxRows: number };
    variant?: "outlined" | "borderless" | "filled" | "underlined" | undefined;
    className?: string;
}

const TextArea = ({ name, placeholder, autoSize, variant }: TextAreaProps) => {
    const { control } = useFormContext();

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required: 'Поле не может быть пустым' },
    });
    return (
        <>
            <Input.TextArea
                {...field}
                placeholder={placeholder}
                autoSize={autoSize}
                variant={variant}
                className={cls.input}
                status={`${error ? 'error' : ''}`}
            />
            {error && <span className={cls.errorMessage}>{error.message}</span>}
        </>
    );
};


export default TextArea;