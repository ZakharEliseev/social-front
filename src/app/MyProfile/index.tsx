import { Button, Divider } from 'antd';

import { Navbar } from '@/shared/ui';
import { BigAvatar } from '@/shared/ui/BigAvatar';
import { useAppSelector } from '@/store/hooks';

import { EditProfileForm } from './ui/Form/EditProfile';

import cls from './index.module.scss';

export const ProfilePage = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);

    return (
        <>
            <Navbar />
            <h1 className={cls.header}>Редактировать профиль</h1>
            <div className={cls.content}>
                <div className={cls.avatarBlock}>
                    <BigAvatar username={currentUser?.username} />
                    <div className={cls.loadAvatar}>
                        <Button
                            className={cls.btn}
                            type="primary"
                            htmlType="submit"
                            color="default"
                            variant="solid">
                            Изменить фото
                        </Button>
                        <p className={cls.imageParams}>
                            JPG, PNG или GIF. Максимальный размер 2MB.
                        </p>
                    </div>
                </div>
                <Divider />
                <EditProfileForm />
            </div>
        </>
    );
};

export default ProfilePage;
