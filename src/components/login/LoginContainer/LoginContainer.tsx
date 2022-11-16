/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { FullScreenView } from 'src/components/common';
import styles from './LoginContainer.module.scss';

type LoginContainerProps = {
    children: ReactNode;
};

/**
 * Login container.
 *
 * @param {LoginContainerProps} props Props.
 * @returns React component.
 */
export const LoginContainer = ({ children }: LoginContainerProps): ReactElement => {
    return (
        <FullScreenView
            showFullScreen
            className={styles.loginContainer}
        >
            {children}
        </FullScreenView>
    );
};
