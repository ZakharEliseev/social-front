import { useState } from 'react';

import { Navbar } from '@/shared/ui';

import { GetUsersResponseList } from './models/constants';
import { SearchForm } from './ui/Form/SearchForm';
import { UsersVirtualizer } from './ui/UsersVirtualizer';

import cls from './index.module.scss';

const SearchPage = () => {
    const [foundUsers, setFoundUsers] = useState<GetUsersResponseList>([]);

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <h3 className={cls.header}>Поиск пользователей</h3>
                <SearchForm setFoundUsers={setFoundUsers} onSuccess={() => setFoundUsers([])} />
                <UsersVirtualizer foundUsers={foundUsers} />
            </div>
        </>
    );
};

export default SearchPage;
