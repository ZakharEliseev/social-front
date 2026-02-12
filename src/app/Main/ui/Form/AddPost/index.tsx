import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { useAddPost } from '@/app/Main/hooks/useAddPost';
import { Avatar } from '@/shared/ui';
import { Controlled } from '@/shared/ui/';
import { useAppSelector } from '@/store/hooks';

import cls from './index.module.scss';

interface Props {
    onSuccess?: () => void;
}

export const AddPostForm = ({ onSuccess }: Props) => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    const { methods, onSubmit } = useAddPost(onSuccess);

    return (
        <FormProvider {...methods}>
            <form className={cls.addPostForm} onSubmit={onSubmit}>
                <div className={cls.content}>
                    <Avatar username={currentUser?.username} />
                    <Controlled.TextArea
                        name="text"
                        placeholder="Что у вас нового?"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        variant="outlined"
                    />
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
        </FormProvider>
    );
};
