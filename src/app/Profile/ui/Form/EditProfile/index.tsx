import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui';

import { useEditProfile } from '../../../hooks/useEditProfile';

import cls from './index.module.scss';

export const EditProfileForm = () => {
    const { methods } = useEditProfile();

    return (
        <FormProvider {...methods}>
            <form>
                <div className={cls.authData}>
                    <div className={cls.wrapper}>
                        <Controlled.Input
                            name="username"
                            placeholder="Имя пользователя"
                            label="Имя пользователя"
                            type="text"
                        />
                    </div>
                    <div className={cls.wrapper}>
                        <Controlled.Input
                            name="email"
                            placeholder="Введите email"
                            label="Электронная почта"
                            type="email"
                        />
                    </div>
                </div>
                <div className={cls.bioWrapper}>
                    <p className={cls.bioHeader}>Био</p>
                    <div className={cls.bioText}>
                        <Controlled.TextArea
                            name="bio"
                            placeholder="Био"
                            autoSize={{ minRows: 4, maxRows: 8 }}
                            variant="outlined"
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
