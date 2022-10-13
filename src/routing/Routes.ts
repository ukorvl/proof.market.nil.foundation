/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { RouteModel } from './RouteModel';
import { Path } from './Paths';

const MarketView = lazy(() => import('../views/MarketView'));
const LoginView = lazy(() => import('../views/LoginView'));
const PortfolioView = lazy(() => import('../views/PortfolioView'));
const Page404 = lazy(() => import('../views/404'));

/**
 * Login route.
 */
export const loginRoute: RouteModel = {
    path: Path.login,
    Component: LoginView,
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
        path: Path.any,
        Component: Page404,
    },
];
