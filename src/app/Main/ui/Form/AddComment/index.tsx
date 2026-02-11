import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { useAddComments } from '@/app/Main/hooks/useAddComments';
import { Controlled } from '@/shared/ui/';

import cls from './index.module.scss';

interface Props {
    postId: number;
    onSuccess?: () => void;
}

export const AddComment = ({ postId, onSuccess }: Props) => {
    const { methods, onSubmit } = useAddComments(postId, onSuccess);
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className={cls.form}>
                <Controlled.TextArea
                    name="text"
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Написать комментарий"
                    variant="outlined"></Controlled.TextArea>
                <Button
                    className={cls.btn}
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid">
                    Отправить
                </Button>
            </form>
        </FormProvider>
    );
};
