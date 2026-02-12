import { Button } from 'antd';

import { Avatar } from '@/shared/ui/MiniAvatar';

import { userApi } from '../../api/users';
import { GetUsersResponse, GetUsersResponseList } from '../../models/constants';

import cls from './index.module.scss';

interface Props {
    user: GetUsersResponse;
    setFoundUsers: React.Dispatch<React.SetStateAction<GetUsersResponseList>>;
}

export const User = ({ user, setFoundUsers }: Props) => {
    const [follow] = userApi.useFollowMutation();

    const followUser = (userId: number, isFollow: boolean) => {
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
            <div>
                <Avatar username={user.username} />
            </div>
            <div>
                <a className={cls.username}>{user.username}</a>
                <p className={cls.bio}>
                    {!user.bio ? 'Пользователь не заполнил информацию о себе' : user.bio}
                </p>
                <p className={cls.followers}>Подписчиков {user.followersCount}</p>
            </div>
            <Button
                type="primary"
                htmlType="submit"
                color="default"
                variant={!user.isFollowing ? 'solid' : 'filled'}
                onClick={() => followUser(user.id, user.isFollowing)}>
                {user.isFollowing ? 'Отписаться' : 'Подписаться'}
            </Button>
        </div>
    );
};
