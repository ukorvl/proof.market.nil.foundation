/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Copyright, FullScreenView } from 'src/components';
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
    return (
        <FullScreenView
            showFullScreen
            className={styles.loginContainer}
        >
            {children}
            <div className={styles.copyright}>
                <Copyright />
            </div>
        </FullScreenView>
    );
};
