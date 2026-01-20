import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { routeConfig } from '@/routes/routerConfig';

export const AppRouter = () => {
    
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({ Component, path }) => (
                    <Route key={path} Component={Component} path={path} />
                ))}
            </Routes>
        </Suspense>
    );};
