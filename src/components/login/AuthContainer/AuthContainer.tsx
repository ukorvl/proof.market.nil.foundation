/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Icon, useBreakpoints } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Copyright, FullScreenView } from 'src/components';
import { Path } from 'src/routing';
import styles from './AuthContainer.module.scss';

/**
 * Props.
 */
type AuthContainerProps = {
    children: ReactNode;
};

/**
 * Auth container.
 *
 * @param {AuthContainerProps} props Props.
 * @returns React component.
 */
export const AuthContainer = ({ children }: AuthContainerProps): ReactElement => {
    const { md, lg } = useBreakpoints();

    return (
        <FullScreenView
            showFullScreen
            className={styles.loginContainer}
        >
            {children}
            {md ||
                (lg && (
                    <Link
                        className={styles.back}
                        to={Path.root}
                    >
                        <Icon iconName="fa-solid fa-chevron-left" />
                        Back to Market
                    </Link>
                ))}
            <div className={styles.copyright}>
                <Copyright />
            </div>
        </FullScreenView>
    );
};
