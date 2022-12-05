/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { login } from 'src/api';
import { useAuth } from 'src/hooks';

/**
 * Props.
 */
type ReadonlyProviderProps = {
    children?: ReactNode;
    fallback?: ReactNode;
    errorView?: ReactNode;
};

/**
 * Provider automatic auth with readonly user.
 *
 * @param {ReadonlyProviderProps} props Props.
 * @returns React component.
 */
export const ReadonlyProvider = ({
    children,
    fallback,
    errorView,
}: ReadonlyProviderProps): ReactElement => {
    const [error, setError] = useState(false);
    const { processLogin, isAuthentificated } = useAuth();

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

        loginWithReadonly(readonlyUser);
    }, [processLogin]);

    if (error) {
        return <>{errorView}</>;
    }

    return <>{isAuthentificated ? children : fallback ?? null}</>;
};
