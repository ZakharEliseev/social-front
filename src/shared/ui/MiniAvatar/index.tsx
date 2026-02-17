import cls from './index.module.scss';

interface Props {
    avatarPath?: string;
    username?: string;
}

export const Avatar = ({ avatarPath, username }: Props) => {
    const avatarLink = `/api/v1/files/avatars/${avatarPath}`;

    return avatarPath ? (
        <img src={avatarLink} className={cls.avatar} />
    ) : (
        <div className={cls.avatar}>{username}</div>
    );
};
