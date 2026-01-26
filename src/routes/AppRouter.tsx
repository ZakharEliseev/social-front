import { Suspense, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router';


import { useGetUserProfileQuery } from '@/app/api';
import NotFound from '@/app/NotFound';
import { useAppSelector } from '@/store/hooks';
import { setUserData } from '@/store/userSlice';

import { RoutePath, privatePages, publicPages } from './routerConfig';

export const PublicGuard = () => {
    const token = localStorage.getItem('token');

    return token ? <Navigate to={RoutePath.feed()} replace /> : <Outlet />;
};

export const PrivateGuard = () => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={RoutePath.login()} replace />;
    }

    if (!currentUser) {
        return;
    }

    return <Outlet />;
};

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { data, isFetching, isSuccess } = useGetUserProfileQuery();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserData(data));
        }
    }, [isSuccess, data]);

    if (isFetching) {
        return <div>Загрузка</div>;
    }

    return (
        <Routes>
            <Route element={<PrivateGuard />}>
                <Route index element={<Navigate to={RoutePath.feed()} replace />} />
                {privatePages.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={<div>Загрузка...</div>}>
                                <Component />
                            </Suspense>
                        }
                    />
                ))}
            </Route>

            <Route element={<PublicGuard />}>
                <Route index element={<Navigate to={RoutePath.login()} replace />} />
                {publicPages.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={<div>Загрузка...</div>}>
                                <Component />
                            </Suspense>
                        }
                    />
                ))}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
