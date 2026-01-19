import { RouteProps } from 'react-router';

import { LoginPageAsync } from '@/app/Auth/ui/LoginPage/LoginPage.async';
import { MainPageAsync } from '@/app/Main/ui/MainPage.async';
import { ProfileEditPageAsync } from '@/app/Profile/ui/ProfileEditPage/ProfileEditPage.async';
import { ProfilePageAsync } from '@/app/Profile/ui/ProfilePage/ProfilePage.async';
import { RegisterPageAsync } from '@/app/Auth/ui/RegisterPage/RegisterPage.async';
import { SearchPageAsync } from '@/app/Search/ui/SearchPage.async';

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
