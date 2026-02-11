import { Navbar } from '@/shared/ui';

import { SearchForm } from './ui/Form/SearchForm';
import { UsersList } from './ui/UsersList';

import cls from './index.module.scss';

const SearchPage = () => {
    

    return (
        <>
            <Navbar />
            <div className={cls.content}>
                <h3 className={cls.header}>Поиск пользователей</h3>
                <SearchForm />
                <UsersList/>
            </div>
        </>
    );
};

export default SearchPage;
