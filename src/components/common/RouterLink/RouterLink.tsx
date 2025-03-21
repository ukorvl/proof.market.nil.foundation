/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { Link, useMatch } from 'react-router-dom';
import type { Path } from '@/features/routing';

/**
 * Props.
 */
type RouterLinkProps = {
    title: ReactNode;
    to: Path | string;
};

/**
 * Router link.
 *
 * @param {RouterLinkProps} props Props.
 * @returns React component.
 */
export const RouterLink = ({ title, to }: RouterLinkProps): ReactElement => {
    const match = useMatch({
        path: to,
        end: false,
    });

    return (
        <Nav.Item
            key={to}
            active={!!match}
            renderLink={({ active: _, ...props }) => (
                <Link
                    to={to}
                    {...props}
                >
                    <span>{title}</span>
                </Link>
            )}
        />
    );
};
