/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { RouterParam } from 'src/enums';
import ProtectedRoute from 'src/components/login/ProtectedRoute/ProtectedRoute';
import { Path } from './Paths';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

const MarketView = lazy(() => import('../views/MarketView'));
const LoginView = lazy(() => import('../views/LoginView'));
const PortfolioView = lazy(() => import('../views/PortfolioView'));
const Page404 = lazy(() => import('../views/404'));
const RegisterView = lazy(() => import('../views/RegisterView'));

/**
 * App routes.
 */
export const routesConfig: RouteObject[] = [
    {
        path: Path.root,
        element: (
            <Navigate
                to={Path.market}
                replace
            />
        ),
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: Path.login,
                element: <LoginView />,
            },
            {
                path: Path.register,
                element: <RegisterView />,
            },
        ],
    },
    {
        element: <MainLayout />,
        children: [
            {
                element: <ProtectedRoute readonlyAccess />,
                children: [
                    {
                        path: Path.market,
                        element: <MarketView />,
                        children: [
                            {
                                path: `:${RouterParam.statementId}`,
                                element: <MarketView />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: Path.portfolio,
                        element: <PortfolioView />,
                        children: [
                            {
                                path: `:${RouterParam.proofId}`,
                                element: <PortfolioView />,
                            },
                        ],
                    },
                ],
            },
            {
                path: Path.any, // This should always be the last
                element: <Page404 />,
            },
        ],
    },
];
