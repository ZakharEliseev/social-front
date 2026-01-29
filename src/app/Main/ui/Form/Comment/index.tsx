import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui/Controlled';

import { useAddComments } from '../../../hooks/useAddComments';

import cls from './index.module.scss';

export const AddComment = () => {
    const { methods, onSubmit } = useAddComments();
    return (
        <>
            <FormProvider {...methods}>
                <form>
                    <div className={cls.inputWrap}>
                        <Controlled.TextArea 
                        name="text"
                        autoSize={{minRows: 3, maxRows: 3}}
                        placeholder='Написать комментарий'
                        variant='outlined'
                        ></Controlled.TextArea>
                        <Button
                            className={cls.btn}
                            type="primary"
                            htmlType="submit"
                            color="default"
                            variant="solid">
                            Отправить
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};
