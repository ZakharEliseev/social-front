import { ComponentType, LazyExoticComponent, lazy } from 'react';

export const RoutePath = {
    root: () => '/',
    feed: () => '/feed',
    login: () => '/login',
    search: () => '/search',
    registration: () => '/registration',
    myProfile: () => '/users/myProfile',
    editProfile: () => `/users/myProfile/edit`,
    user: (id: string) => `/users/${id}`,
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
        path: RoutePath.myProfile(),
        Component: lazy(() => import('@/app/Profile/pages/MyProfile')),
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
