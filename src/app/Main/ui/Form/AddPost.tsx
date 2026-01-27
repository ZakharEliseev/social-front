import { Button, Input } from 'antd';

import { ProfileResponse } from '@/app/api';

import { useAddPost } from '../../hooks/useAddPost';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const AddPostForm = ({ currentUser }: Props) => {
    const { TextArea } = Input;
    const username = currentUser?.username.charAt(0).toUpperCase();
    const { field, fieldState, onSubmit } = useAddPost();

    return (
        <form className={cls.addPostForm} onSubmit={onSubmit}>
            <div className={cls.inputWrap}>
                <div className={cls.avatar}>{username}</div>
                <TextArea
                    className={cls.input}
                    status={`${fieldState.error ? 'error' : ''}`}
                    placeholder="Что у вас нового?"
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    variant="outlined"
                    {...field}
                />
                {fieldState.error && (
                    <span className={cls.errorMessage}>{fieldState.error.message}</span>
                )}
            </div>
            <Button
                className={cls.btn}
                type="primary"
                htmlType="submit"
                color="default"
                variant="solid">
                Опубликовать
            </Button>
        </form>
    );
};
