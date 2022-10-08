/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Breadcrumbs as NativeBreadcrumbs } from '@nilfoundation/react-components';
import './Breadcrumbs.scss';

/**
 * Breadcrumbs component.
 *
 * @returns React component.
 */
export const Breadcrumbs = (): JSX.Element => {
    return (
        <NativeBreadcrumbs className="customBreadcumbs">
            <NativeBreadcrumbs.Item href="https://nil.foundation">
                <span>
                    <code>=nil;</code>Foundation
                </span>
            </NativeBreadcrumbs.Item>
            <NativeBreadcrumbs.Item href="/">
                <span>Proof Market</span>
            </NativeBreadcrumbs.Item>
        </NativeBreadcrumbs>
    );
};
