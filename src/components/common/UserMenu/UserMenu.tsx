/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Button, Dropdown, Icon } from '@nilfoundation/react-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks';
import { Path } from 'src/routing';
import styles from './UserMenu.module.scss';

/**
 * User menu.
 *
 * @returns React component.
 */
export const UserMenu = (): ReactElement => {
    const { user, processLogout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <Button
                className={styles.button}
                onClick={() => navigate(Path.login)}
            >
                <Icon iconName="fa-solid fa-circle-user" />
                sign in
            </Button>
        );
    }

    return (
        <Dropdown className={styles.dropdown}>
            <Dropdown.Button className={styles.button}>
                <Icon iconName="fa-solid fa-circle-user" />
                {user}
            </Dropdown.Button>
            <Dropdown.Menu align="right">
                <Dropdown.Item onSelect={processLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
