import { lazy } from 'react';

import { RouteProps } from 'react-router';

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    SEARCH = 'search',
    REGISTER = 'register',
    PROFILE = 'profile',
    PROFILE_EDIT = 'profile_edit',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SEARCH]: '/search',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.PROFILE]: '/profile/:id',
    [AppRoutes.PROFILE_EDIT]: '/profile/edit',
    [AppRoutes.NOT_FOUND]: '*',
};

export const publicRouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        Component:  lazy(() => import('@/app/Main')),
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        Component: lazy(() => import('@/app/Auth/pages/Login')),
    },
    [AppRoutes.SEARCH]: {
        path: RoutePath.search,
        Component: lazy(() => import('@/app/Search/ui')),
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        Component: lazy(() => import('@/app/Auth/pages/Register')),
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        Component: lazy(() => import('@/app/Profile/ui/ProfilePage')),
    },
    [AppRoutes.PROFILE_EDIT]: {
        path: RoutePath.profile_edit,
        Component: lazy(() => import('@/app/Profile/ui/ProfileEditPage')),
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        Component: lazy(() => import('@/app/NotFound')),
    },
};

// export const privateRouteConfig: Record<AppRoutes, RouteProps> = {

// };