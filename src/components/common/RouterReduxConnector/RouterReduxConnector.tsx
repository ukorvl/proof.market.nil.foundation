/**
 * @file Index.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { SetLocation, SetNavigateFunction, SetParams } from 'src/redux';

/**
 * Component to dispatch location and params changes into redux store.
 *
 * @returns React component.
 */
const RouterReduxConnector = (): ReactElement => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useDeepCompareEffect(() => {
        dispatch(SetNavigateFunction(navigate));
    }, [dispatch, navigate]);

    useDeepCompareEffect(() => {
        dispatch(SetLocation(location));
    }, [dispatch, location]);

    useDeepCompareEffect(() => {
        dispatch(SetParams(params));
    }, [dispatch, params]);

    return <Outlet />;
};

export default RouterReduxConnector;
