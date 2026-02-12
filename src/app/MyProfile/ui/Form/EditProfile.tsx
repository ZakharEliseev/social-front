import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui';

import { useEditProfile } from '../../hooks/useEditProfile';

export const EditProfileForm = () => {
    const { methods } = useEditProfile();

    return (
        <FormProvider {...methods}>
            <form>
                <Controlled.Input
                    name="username"
                    placeholder="Имя пользователя"
                    label="Имя пользователя"
                    type="text"
                />
                <Controlled.Input
                    name="email"
                    placeholder="Введите email"
                    label="Электронная почта"
                    type="email"
                />
                <Controlled.TextArea
                    name="text"
                    placeholder="Био"
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    variant="outlined"
                />
                <Button type="primary" htmlType="submit" color="default" variant="solid">
                    Опубликовать
                </Button>
            </form>
        </FormProvider>
    );
};
