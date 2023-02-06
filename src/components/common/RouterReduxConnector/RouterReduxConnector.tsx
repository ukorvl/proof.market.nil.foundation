/**
 * @file Index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { SetLocation, SetParams } from 'src/redux';

/**
 * Component to dispatch location and params changes into redux store.
 *
 * @returns React component.
 */
const RouterReduxConnector = (): ReactElement => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SetLocation(location));
    }, [dispatch, location]);

    useEffect(() => {
        dispatch(SetParams(params));
    }, [dispatch, params]);

    return <Outlet />;
};

export default RouterReduxConnector;
