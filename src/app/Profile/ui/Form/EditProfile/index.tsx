import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';

import { Controlled } from '@/shared/ui';

import { useEditProfile } from '../../../hooks/useEditProfile';

import cls from './index.module.scss';

export const EditProfileForm = () => {
    const { methods, onSubmit } = useEditProfile();

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className={cls.authData}>
                    <Controlled.Input
                        name="email"
                        placeholder="Введите email"
                        label="Электронная почта"
                        type="email"
                    />
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
