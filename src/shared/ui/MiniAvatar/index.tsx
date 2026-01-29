import cls from './index.module.scss';

interface Props {
  username: string | undefined;
}

export const Avatar = ({username}: Props) => {
    
    return <div className={cls.avatar}>{username}</div>;};
