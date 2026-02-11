import { useState } from 'react';

import { Navbar } from '@/shared/ui';

import { GetUsersResponseList } from './models/constants';
import { SearchForm } from './ui/Form/SearchForm';
import { UsersList } from './ui/UsersList';

import cls from './index.module.scss';

const SearchPage = () => {
    const [foundUsers, setFoundUsers] = useState<GetUsersResponseList>([]);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <h3 className={cls.header}>Поиск пользователей</h3>
                <SearchForm setFoundUsers={setFoundUsers} />
                <UsersList foundUsers={foundUsers} />
            </div>
        </>
    );
};

export default SearchPage;
