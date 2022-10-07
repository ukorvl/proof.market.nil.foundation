/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { RouteModel } from './RouteModel';
import { Path } from './Paths';

const DashboardView = lazy(() => import('../views/DashboardView'));
const Page404 = lazy(() => import('../views/404'));

/**
 * App routes.
 */
export const routes: RouteModel[] = [
    {
        path: Path.root,
        Component: DashboardView
    },
    {
        path: Path.any,
        Component: Page404
    }
];
