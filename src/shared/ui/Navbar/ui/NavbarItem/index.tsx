import { Button } from 'antd';

import cls from './index.module.scss';

interface Props {
    children: string;
}

export const NavbarItem = ({children}: Props) => {
    
    return (
        <Button>
            {children}
        </Button>
    )};
