import cls from './index.module.scss';

interface Props {
    username: string | undefined;
}

export const BigAvatar = ({ username }: Props) => {
    return <div className={cls.avatar}>{username}</div>;
};
