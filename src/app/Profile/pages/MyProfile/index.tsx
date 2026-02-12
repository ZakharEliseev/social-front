import { NavLink } from 'react-router';

import { Navbar } from '@/shared/ui';

import cls from './index.module.scss';

export const MyProfile = () => {
    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <NavLink to={'/users/myProfile/edit'}>EditProfile</NavLink>
            </div>
        </>
    );
};

export default MyProfile;