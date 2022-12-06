/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { login } from 'src/api';
import { useAuth, useLogin } from 'src/hooks';

/**
 * Props.
 */
type ReadonlyAccessProviderProps = {
    children?: ReactNode;
    fallback?: ReactNode;
    errorView?: ReactNode;
};

/**
 * Provider automatic auth with readonly user.
 *
 * @param {ReadonlyAccessProviderProps} props Props.
 * @returns React component.
 */
export const ReadonlyAccessProvider = ({
    children,
    fallback,
    errorView,
}: ReadonlyAccessProviderProps): ReactElement => {
    const [error, setError] = useState(false);
    const processLogin = useLogin();
    const { isAuthentificated } = useAuth();

    useEffect(() => {
        const readonlyUser = process.env.REACT_APP_READONLY_USER;

        if (!readonlyUser) {
            return;
        }

        const loginWithReadonly = async (user: string) => {
            try {
                const { jwt } = await login({
                    username: user,
                    password: '',
                });

                processLogin(jwt);
            } catch (e) {
                setError(true);
            }
        };

        !isAuthentificated && loginWithReadonly(readonlyUser);
    }, [processLogin, isAuthentificated]);

    if (error) {
        return <>{errorView}</>;
    }

    return <>{isAuthentificated ? children : fallback ?? null}</>;
};
