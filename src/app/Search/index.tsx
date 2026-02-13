import { useState } from 'react';

import { Navbar } from '@/shared/ui';

import { GetUsersResponseList } from './models/types';
import { SearchForm } from './ui/Form/SearchForm';
import { UsersList } from './ui/UsersVirtualizer';

import cls from './index.module.scss';

const SearchPage = () => {
    const [foundUsers, setFoundUsers] = useState<GetUsersResponseList>([]);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <h3 className={cls.header}>Поиск пользователей</h3>
                <SearchForm setFoundUsers={setFoundUsers} onSuccess={() => setFoundUsers([])} />
                <UsersList foundUsers={foundUsers} setFoundUsers={setFoundUsers} />
            </div>
        </>
    );
};

export default SearchPage;
