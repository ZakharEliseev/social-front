import { Button } from 'antd';
import { NavLink } from 'react-router';

import { ProfileResponse } from '@/app/Auth/models/types';
import { Avatar } from '@/shared/ui/MiniAvatar';
import { useAppSelector } from '@/store/hooks';
import { ArrowRightOutlined } from '@ant-design/icons';

import { userApi } from '../../api/users';
import { GetUsersResponseList } from '../../models/types';

import cls from './index.module.scss';

interface Props {
    user: ProfileResponse;
    setFoundUsers?: React.Dispatch<React.SetStateAction<GetUsersResponseList>>;
}

export const User = ({ user, setFoundUsers }: Props) => {
    const [follow] = userApi.useFollowMutation();
    const currentUser = useAppSelector((state) => state.profile.profile);

    const followUser = (userId: number, isFollow: boolean) => {
        if (!setFoundUsers) return;
        follow({ id: userId, isFollow });
        setFoundUsers((prev) =>
            prev.map((user) => ({
                ...user,
                isFollowing: !user.isFollowing,
                followersCount: user.followersCount
                    ? user.followersCount - 1
                    : user.followersCount + 1,
            })),
        );
    };

    return (
        <div key={user.id} className={cls.content}>
            <NavLink to={`/users/${user.id}`} className={cls.link}>
                <Avatar username={user.username} />
            </NavLink>
            <div className={cls.userInfo}>
                <NavLink to={`/users/${user.id}`} className={cls.link}>
                    <p className={cls.username}>{user.username}</p>
                </NavLink>
                <p className={cls.bio}>
                    {!user.bio ? 'Пользователь не заполнил информацию о себе' : user.bio}
                </p>
                <div className={cls.userCounts}>
                    <p className={cls.followers}>Подписчиков {user.followersCount}</p>
                    <p className={cls.followers}>Постов {user.postsCount}</p>
                    <p className={cls.followers}>Подписок {user.followingCount}</p>
                </div>
            </div>
            {currentUser?.id === user.id ? (
                <NavLink to={'/users/myProfile/edit'} className={cls.goToEdit}>
                    Редактировать профиль <ArrowRightOutlined />
                </NavLink>
            ) : (
                <Button
                    type="primary"
                    htmlType="submit"
                    color="default"
                    variant={!user.isFollowing ? 'solid' : 'filled'}
                    onClick={() => followUser(user.id, user.isFollowing)}>
                    {user.isFollowing ? 'Отписаться' : 'Подписаться'}
                </Button>
            )}
        </div>
    );
};
