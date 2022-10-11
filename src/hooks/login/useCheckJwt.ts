/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chekJwt } from '../../api';
import { UpdateUser } from '../../redux';
import { Path } from '../../routing';

/**
 * Check jwt and navigate to login page if unauthorized.
 */
export const useCheckJwt = (): void => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkJwtHandler = async () => {
            try {
                await chekJwt();
            } catch (e: any) {
                console.log(e, Object.keys(e));
                if (e.status === 401) {
                    dispatch(UpdateUser(null));
                    navigate(Path.login, { replace: true });
                }
            }
        };

        checkJwtHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
