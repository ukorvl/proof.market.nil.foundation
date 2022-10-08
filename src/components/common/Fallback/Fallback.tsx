/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import './Fallback.scss';

/**
 * Fallback component to display between routes switches.
 *
 * @returns React component.
 */
export const Fallback = (): ReactElement => {
    return (
        <div className="fallbackComponent">
            <Spinner />
        </div>
    );
};
