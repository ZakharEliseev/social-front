import { AppRouter } from '@/routes/AppRouter';

import cls from './index.module.scss';

export const App = () => {
    return (
        <div className={cls.app}>
            <AppRouter />
        </div>
    );
};
