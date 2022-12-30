/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
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
                        path: Path.root,
                        element: <MarketView />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: Path.portfolio,
                        element: <PortfolioView />,
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
