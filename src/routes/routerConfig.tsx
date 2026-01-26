import { lazy } from 'react';

import { RouteProps } from 'react-router';

export const RoutePath = {
    root: () => '/',
    feed: () => '/feed',
    login: () => '/login',
    search: () => '/search',
    registration: () => '/registration',
    profile: (id: string) => `/profile/${id}`,
    editProfile: () => '/profile/edit',
    notFound: () => '*',
};


export const privatePages: RouteProps[] = [
    {
        path: RoutePath.root(),
        Component: lazy(() => import('@/app/Main')),
    },
    {
        path: RoutePath.search(),
        Component: lazy(() => import('@/app/Search/ui')),
    },
    {
        path: RoutePath.profile(':id'),
        Component: lazy(() => import('@/app/Profile/ui/ProfilePage')),
    },
    {
        path: RoutePath.editProfile(),
        Component: lazy(() => import('@/app/Profile/ui/ProfileEditPage')),
    },
];

export const publicPages: RouteProps[] = [
    {
        path: RoutePath.login(),
        Component: lazy(() => import('@/app/Auth/pages/Login')),
    },
    {
        path: RoutePath.registration(),
        Component: lazy(() => import('@/app/Auth/pages/Register')),
    },
    {
        path: RoutePath.notFound(),
        Component: lazy(() => import('@/app/NotFound')),
    },
];
