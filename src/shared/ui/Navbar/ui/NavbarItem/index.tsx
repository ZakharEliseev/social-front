import classNames from 'classnames';

import { NavLink } from 'react-router';

import cls from './index.module.scss';


import './index.module.scss';

interface Props {
    children: string;
    location: string;
    icon: React.ReactNode;
}

export const NavbarItem = ({ children, location, icon }: Props) => {
    return (
        <NavLink
            to={location}
            className={({ isActive }) => classNames(cls.link, {[cls.active] : isActive})}>
            {icon}
            {children}
        </NavLink>
    );
};
