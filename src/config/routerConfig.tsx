import { RouteProps } from 'react-router';

import { LoginPageAsync } from '@/components/App/pages/LoginPage/LoginPage.async';
import { MainPageAsync } from '@/components/App/pages/MainPage/MainPage.async';
import { ProfileEditPageAsync } from '@/components/App/pages/ProfileEditPage/ProfileEditPage.async';
import { ProfilePageAsync } from '@/components/App/pages/ProfilePage/ProfilePage.async';
import { RegisterPageAsync } from '@/components/App/pages/RegisterPage/RegisterPage.async';
import { SearchPageAsync } from '@/components/App/pages/SearchPage/SearchPage.async';

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    SEARCH = 'search',
    REGISTER = 'register',
    PROFILE = 'profile',
    PROFILE_EDIT = 'profile_edit',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SEARCH]: '/search',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.PROFILE]: "/profile/:id'",
    [AppRoutes.PROFILE_EDIT]: '/profile/edit',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageAsync />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPageAsync />,
    },
    [AppRoutes.SEARCH]: {
        path: RoutePath.search,
        element: <SearchPageAsync />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPageAsync />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePageAsync />,
    },
    [AppRoutes.PROFILE_EDIT]: {
        path: RoutePath.profile_edit,
        element: <ProfileEditPageAsync />,
    },
};
