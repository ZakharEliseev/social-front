import { Navbar } from '@/shared/ui';

import cls from './index.module.scss';

const SearchPage = () => {
    return (
        <>
            <Navbar />
            <div className={cls.content}>Поиск</div>
        </>
    );
};

export default SearchPage;
