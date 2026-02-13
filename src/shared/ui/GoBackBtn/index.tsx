import { useNavigate } from 'react-router';

import { ArrowLeftOutlined } from '@ant-design/icons';

import cls from './index.module.scss';

export const GoBackBtn = () => {
    const navigate = useNavigate();
    return (
        <a className={cls.goBack} onClick={() => navigate(-1)}>
            <ArrowLeftOutlined /> Назад
        </a>
    );
};
