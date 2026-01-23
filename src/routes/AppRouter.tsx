import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { publicRouteConfig } from '@/routes/routerConfig';

import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
    
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                <ProtectedRoute>
                    {Object.values(publicRouteConfig).map(({ Component, path }) => (
                        <Route key={path} Component={Component} path={path} />
                    ))}
                </ProtectedRoute>
            </Routes>
        </Suspense>
    );};
