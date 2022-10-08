/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { RouteModel } from './RouteModel';
import { Path } from './Paths';

const MarketView = lazy(() => import('../views/MarketView'));
const LoginView = lazy(() => import('../views/LoginView'));
const Page404 = lazy(() => import('../views/404'));

/**
 * App routes.
 */
export const routes: RouteModel[] = [
    {
        path: Path.root,
        Component: MarketView
    },
    {
        path: Path.login,
        Component: LoginView
    },
    {
        path: Path.any,
        Component: Page404
    }
];
