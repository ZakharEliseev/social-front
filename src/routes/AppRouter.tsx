import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { routeConfig } from '@/routes/routerConfig';

import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
    
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({ element, path, isProtected }) => {
                    const renderedElement = isProtected ? (
                        <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                        element
                    );
                    return <Route key={path} path={path} element={renderedElement} />;
                })}
            </Routes>
        </Suspense>
    );};
