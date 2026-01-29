import { ComponentType, LazyExoticComponent, lazy } from 'react';

export const RoutePath = {
    root: () => '/',
    feed: () => '/feed',
    login: () => '/login',
    search: () => '/search',
    registration: () => '/registration',
    profile: () => `/users/profile/`,
    user: (id: string) => `/users/${id}`,
    editProfile: () => '/profile/edit',
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
        path: RoutePath.profile(),
        Component: lazy(() => import('@/app/Profile/ProfilePage')),
    },
    {
        path: RoutePath.editProfile(),
        Component: lazy(() => import('@/app/Profile/ProfileEditPage')),
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
