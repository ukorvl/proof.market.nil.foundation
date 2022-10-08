/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../../../routing';

/**
 * Props.
 */
type AuthRenderPolicyProps = {
    children: ReactNode;
};

/**
 * Component to restrict non-authorized users access.
 *
 * @param {AuthRenderPolicyProps} props - Props.
 * @returns React component.
 */
export const AuthRenderPolicy = ({ children }: AuthRenderPolicyProps): ReactElement => {
    const isAuthorized = true; // TODO

    return (
        <>
            {isAuthorized ? (
                children
            ) : (
                <Navigate
                    replace
                    to={Path.login}
                />
            )}
        </>
    );
};
