import { ComponentType, LazyExoticComponent, lazy } from 'react';

export const RoutePath = {
    root: () => '/',
    feed: () => '/feed',
    login: () => '/login',
    search: () => '/search',
    registration: () => '/registration',
    editProfile: () => `/users/myProfile/edit`,
    user: (id: string) => `/users/${id || ':id'}`,
    notFound: () => '*',
};

type RouteConfig = {
    path: string;
    Component: LazyExoticComponent<ComponentType<any>>;
};

export const privatePages: RouteConfig[] = [
    {
        path: RoutePath.search(),
        Component: lazy(() => import('@/app/Search')),
    },
    {
        path: RoutePath.editProfile(),
        Component: lazy(() => import('@/app/Profile/pages/EditProfile')),
    },
    {
        path: RoutePath.user(':id'),
        Component: lazy(() => import('@/app/Profile/pages/Profile')),
    },
    {
        path: RoutePath.feed(),
        Component: lazy(() => import('@/app/Main')),
    },
];

export const publicPages: RouteConfig[] = [
    {
        path: RoutePath.login(),
        Component: lazy(() => import('@/app/Auth/pages/Login')),
    },
    {
        path: RoutePath.registration(),
        Component: lazy(() => import('@/app/Auth/pages/Register')),
    },
];
