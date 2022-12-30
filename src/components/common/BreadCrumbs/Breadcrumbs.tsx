/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Breadcrumbs as NativeBreadcrumbs } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { mainSiteAddress } from 'src/constants';
import { Path } from 'src/routing';
import styles from './Breadcrumbs.module.scss';

/**
 * Breadcrumbs component.
 *
 * @returns React component.
 */
export const Breadcrumbs = (): JSX.Element => {
    return (
        <NativeBreadcrumbs className={styles.breadcrumbs}>
            <NativeBreadcrumbs.Item
                href={mainSiteAddress}
                className={styles.item}
            >
                <span>
                    <code>=nil;</code>Foundation
                </span>
            </NativeBreadcrumbs.Item>
            <NativeBreadcrumbs.Item
                className={styles.item}
                renderLink={() => (
                    <Link to={Path.market}>
                        <span>Proof Market</span>
                    </Link>
                )}
            />
        </NativeBreadcrumbs>
    );
};
