import { Divider } from 'antd';

import { GoBackBtn, Navbar } from '@/shared/ui';
import { BigAvatar } from '@/shared/ui/BigAvatar';
import { useAppSelector } from '@/store/hooks';

import { EditPassword } from '../../ui/Form/EditPassword';
import { EditProfileForm } from '../../ui/Form/EditProfile';
import { UploadAvatar } from '../../ui/Form/UploadAvatar';

import cls from './index.module.scss';

export const ProfilePage = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);

    return (
        <>
            <Navbar />
            <GoBackBtn />
            <h1 className={cls.header}>Редактировать профиль</h1>
            <div className={cls.content}>
                <div className={cls.avatarBlock}>
                    <BigAvatar avatarPath={currentUser?.avatar} username={currentUser?.username} />
                    <div className={cls.loadAvatar}>
                        <UploadAvatar avatar={currentUser?.avatar} />
                        <p className={cls.imageParams}>
                            JPG, PNG или GIF. Максимальный размер 2MB.
                        </p>
                    </div>
                </div>
                <Divider />
                <EditProfileForm />
                <Divider />
                <p className={cls.subHeader}>Изменить пароль</p>
                <EditPassword />
            </div>
        </>
    );
};

export default ProfilePage;
