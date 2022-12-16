/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { RouteModel } from './RouteModel';
import { Path } from './Paths';
import LoginView from 'src/views/LoginView';
import RegisterView from 'src/views/RegisterView';
import MarketView from 'src/views/MarketView';
import PortfolioView from 'src/views/PortfolioView';
import Page404 from 'src/views/404';

// const MarketView = lazy(() => import('../views/MarketView'));
// const LoginView = lazy(() => import('../views/LoginView'));
// const PortfolioView = lazy(() => import('../views/PortfolioView'));
// const Page404 = lazy(() => import('../views/404'));
// const RegisterView = lazy(() => import('../views/RegisterView'));

/**
 * Login route.
 */
export const loginRoute: RouteModel = {
    path: Path.login,
    Component: LoginView,
};

/**
 * Register route.
 */
export const registerRoute: RouteModel = {
    path: Path.register,
    Component: RegisterView,
};

/**
 * App routes.
 */
export const routes: RouteModel[] = [
    {
        path: Path.root,
        Component: MarketView,
    },
    {
        path: Path.portfolio,
        Component: PortfolioView,
    },
    {
        path: Path.any, // This should always be the last
        Component: Page404,
    },
];
