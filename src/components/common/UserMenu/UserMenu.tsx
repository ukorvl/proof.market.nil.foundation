/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Dropdown, Icon, Variant } from '@nilfoundation/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '../../../redux';
import { UpdateUser } from '../../../redux/login/actions';
import { removeItemFromLocalStorage } from '../../../packages/LocalStorage';
import './UserMenu.scss';

/**
 * User menu.
 *
 * @returns React component.
 */
export const UserMenu = (): ReactElement => {
    const dispatch = useDispatch();
    const user = useSelector((s: RootStateType) => s.userState.user);
    const logout = () => {
        dispatch(UpdateUser(null));
        removeItemFromLocalStorage('jwt');
    };

    return (
        <Dropdown className="userMenu">
            <Dropdown.Button variant={Variant.info}>
                <Icon iconName="fa-solid fa-circle-user" />
                {user}
            </Dropdown.Button>
            <Dropdown.Menu>
                <Dropdown.Item onSelect={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
