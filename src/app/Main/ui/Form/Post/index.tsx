import { Button} from 'antd';
import { FormProvider } from 'react-hook-form';

import { ProfileResponse } from '@/app/api/types/models';
import { useAddPost } from '@/app/Main/hooks/useAddPost';
import { Avatar } from '@/shared/ui';
import { Controlled } from '@/shared/ui/Controlled';

import cls from './index.module.scss';

interface Props {
    currentUser?: ProfileResponse | null;
}

export const AddPostForm = ({ currentUser }: Props) => {
    const { methods, onSubmit } = useAddPost();

    return (
        <FormProvider {...methods}>
            <form className={cls.addPostForm} onSubmit={onSubmit}>
                <div className={cls.contentWrap}>
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
