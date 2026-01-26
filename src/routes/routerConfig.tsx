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

type RouteConfig = RouteProps & {
    isProtected?: boolean;
};

const MainPage = lazy(() => import('@/app/Main'));
const LoginPage = lazy(() => import('@/app/Auth/pages/Login'));
const SearchPage = lazy(() => import('@/app/Search/ui'));
const RegisterPage = lazy(() => import('@/app/Auth/pages/Register'));
const ProfilePage = lazy(() => import('@/app/Profile/ui/ProfilePage'));
const ProfileEditPage = lazy(() => import('@/app/Profile/ui/ProfileEditPage'));
const NotFound = lazy(() => import('@/app/NotFound'));

export const routeConfig: Record<AppRoutes, RouteConfig> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        isProtected: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
        isProtected: false,
    },
    [AppRoutes.SEARCH]: {
        path: RoutePath.search,
        element: <SearchPage />,
        isProtected: true,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
        isProtected: false,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        isProtected: true,
    },
    [AppRoutes.PROFILE_EDIT]: {
        path: RoutePath.profile_edit,
        element: <ProfileEditPage />,
        isProtected: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
        isProtected: false, 
    },
};
