/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Path } from 'src/routing';

/**
 * Message to show after successfull registration.
 *
 * @returns React component.
 */
export const SuccessRegisterMessage = (): ReactElement => {
    return (
        <div className="text-center">
            <div>Thanks for registration!</div>
            <Link to={Path.root}>Continue exploring</Link>
        </div>
    );
};
