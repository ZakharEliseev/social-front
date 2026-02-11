import { Button } from 'antd';

import { Avatar } from '@/shared/ui/MiniAvatar';

import { GetUsersResponse } from '../../models/constants';

import cls from './index.module.scss';

interface Props {
    user: GetUsersResponse;
}

export const User = ({ user }: Props) => {
    return (
            <div key={user.id} className={cls.content}>
                <div>
                    <Avatar username={user.username} />
                </div>
                <div>
                    <a className={cls.username}>{user.username}</a>
                    <p className={cls.bio}>BIO</p>
                    <p className={cls.followers}>FOLLOWERS_COUNT</p>
                </div>
                <Button type="primary" htmlType="submit" color="default" variant="solid">
                    Подписаться
                </Button>
            </div>
    );
};
