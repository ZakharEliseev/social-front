import { User } from '@/app/Search/ui/User';
import { Navbar } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import cls from './index.module.scss';

export const MyProfile = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    if (!currentUser) return;
    return (
        <>
            <Navbar />
            <div className={cls.userCard}>
                <User user={currentUser} />
            </div>
            
            <div className={cls.content}></div>
        </>
    );
};

export default MyProfile;
