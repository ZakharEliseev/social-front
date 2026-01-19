import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { routeConfig } from '@/config/routerConfig';

export const AppRouter = () => {
    
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route key={path} element={element} path={path}/>
                ))}
            </Routes>
        </Suspense>
    );};
