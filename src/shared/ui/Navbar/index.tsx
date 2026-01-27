import { useNavigate } from 'react-router';

import { Logo } from '@/shared/ui/';
import { HomeOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

import { NavbarItem } from './ui/NavbarItem';

import cls from './index.module.scss';

export const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className={cls.navbar}>
            <Logo />
            <div className={cls.itemsWrapper}>
                <NavbarItem location={'/'} icon={<HomeOutlined />}>
                    Лента
                </NavbarItem>
                <NavbarItem location={'/search'} icon={<SearchOutlined />}>
                    Поиск
                </NavbarItem>
                <NavbarItem location={'/profile:id'} icon={<UserOutlined />}>
                    Профиль
                </NavbarItem>
                <button className={cls.logout} onClick={logout}>
                    <LogoutOutlined />
                    Выйти
                </button>
            </div>
        </div>
    );
};