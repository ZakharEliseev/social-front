import { Logo } from '@/shared/ui/';

import { NavbarItem } from './ui/NavbarItem';

import cls from './index.module.scss';

export const Navbar = () => {
    return (
        <div className={cls.navbar}>
            <Logo />
            <div className={cls.itemsWrapper}>
                <NavbarItem>Лента</NavbarItem>
                <NavbarItem>Лента</NavbarItem>
                <NavbarItem>Лента</NavbarItem>
                <NavbarItem>Лента</NavbarItem>
            </div>
        </div>
    );
};
