import { Logo } from '@/shared/ui/';
import { HomeOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

import { NavbarItem } from './ui/NavbarItem';

import cls from './index.module.scss';

export const Navbar = () => {
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
                <NavbarItem location={'/logout'} icon={<LogoutOutlined />}>
                    Выйти
                </NavbarItem>
            </div>
        </div>
    );
};
