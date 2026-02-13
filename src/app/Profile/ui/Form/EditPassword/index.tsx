import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';


import { useEditPassword } from '@/app/Profile/hooks/useEditPassword';
import { Controlled } from '@/shared/ui/';

import cls from './index.module.scss';

export const EditPassword = () => {
    const { methods } = useEditPassword();

    return (
        <FormProvider {...methods}>
            <form>
                <div className={cls.authData}>
                    <div className={cls.wrapper}>
                        <Controlled.Input
                            name="currentPassword"
                            placeholder="Введите новый пароль"
                            label="Новый пароль"
                            type="password"
                        />
                    </div>
                    <div className={cls.wrapper}>
                        <Controlled.Input
                            name="newPassword"
                            placeholder="Подтвердите новый пароль"
                            label="Подтвердите новый пароль"
                            type="password"
                        />
                    </div>
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant="solid"
                    className={cls.btn}>
                    Подтвердить изменения
                </Button>
            </form>
        </FormProvider>
    );
};
