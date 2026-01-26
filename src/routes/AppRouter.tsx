import { Suspense, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { socialApi } from '@/app/api';
import NotFound from '@/app/NotFound';
import { useAppSelector } from '@/store/hooks';
import { setUserData } from '@/store/userSlice';

import { RoutePath, privatePages, publicPages } from './config';

export const NavigationGuard = ({ isPublic = false }: { isPublic?: boolean }) => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    const token = localStorage.getItem('token');

    if (isPublic) {
        return token ? <Navigate to={RoutePath.feed()} replace /> : <Outlet />;
    }

    if (token && currentUser) {
        return <Outlet />;
    }

    return <Navigate to={RoutePath.login()} replace />;
};

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { data, isFetching, isSuccess, isError } = socialApi.useGetUserProfileQuery();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserData(data));
        }
        if (isError) {
            localStorage.removeItem('token');
        }
    }, [isSuccess, isError, data]);

    if (isFetching) {
        return <div>Загрузка</div>;
    }

    return (
        <Routes>
            <Route element={<NavigationGuard />}>
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

            <Route element={<NavigationGuard isPublic />}>
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
