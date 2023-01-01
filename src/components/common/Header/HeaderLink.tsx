/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { Link, useMatch } from 'react-router-dom';
import { Path } from 'src/routing';

/**
 * Props.
 */
type HeaderLinkProps = {
    title: string;
    to: Path;
};

/**
 * Header link.
 *
 * @param {HeaderLinkProps} props Props.
 * @returns React component.
 */
export const HeaderLink = ({ title, to }: HeaderLinkProps): ReactElement => {
    const match = useMatch({
        path: to,
        end: false,
    });

    return (
        <Nav.Item
            key={title}
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
