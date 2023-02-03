/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import {
    useAppSelector,
    selectCurrentUserCreatedBids,
    selectCurrentUserCompletedBids,
    selectCurrentUserActiveAsks,
    selectCurrentUserCompletedAsks,
} from 'src/redux';
import { TradeOrderType } from 'src/models';
import { formatDate } from 'src/utils';
import type { Ask, Bid, ManageOrdersData } from 'src/models';

/**
 * UseGetManageOrdersData hook return type.
 */
export type UseGetManageOrdersDataReturnType = {
    loadingData: boolean;
    isError: boolean;
    activeOrdersData: ManageOrdersData[];
    historyOrdersData: ManageOrdersData[];
};

/**
 * Get data to render manage orders panel.
 *
 * @returns Data to render manage orders panel.
 */
export const useGetManageOrdersData = (): UseGetManageOrdersDataReturnType => {
    const loadingData = useAppSelector(s => s.bidsState.isLoading || s.asksState.isLoading);
    const createdBids = useSelector(selectCurrentUserCreatedBids, deepEqual);
    const completedBids = useSelector(selectCurrentUserCompletedBids, deepEqual);
    const createdAsks = useSelector(selectCurrentUserActiveAsks, deepEqual);
    const completedAsks = useSelector(selectCurrentUserCompletedAsks, deepEqual);
    const isError = useAppSelector(s => s.asksState.error || s.bidsState.error);

    const activeOrdersData = useMemo(() => {
        const mappedAsks = createdAsks.map(x => mapToManageOrdersData(x, TradeOrderType.sell));
        const mappedBids = createdBids.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

        return [...mappedAsks, ...mappedBids];
    }, [createdAsks, createdBids]);

    const historyOrdersData = useMemo(() => {
        const mappedAsks = completedAsks.map(x => mapToManageOrdersData(x, TradeOrderType.sell));
        const mappedBids = completedBids.map(x => mapToManageOrdersData(x, TradeOrderType.buy));

        return [...mappedAsks, ...mappedBids];
    }, [completedAsks, completedBids]);

    return { loadingData, isError, activeOrdersData, historyOrdersData };
};

/**
 * Maps trade orders list to manage orders table data list.
 *
 * @param {Ask | Bid} order - Current order.
 * @param type Type.
 * @returns Manage orders table data list.
 */
const mapToManageOrdersData = <T extends Ask | Bid>(
    { createdOn, matched_time, cost, eval_time, _key, status }: T,
    type: TradeOrderType,
): ManageOrdersData => ({
    init_time: formatDate(createdOn, 'DD.MM HH:mm'),
    timestamp: formatDate(matched_time!, 'DD.MM HH:mm'),
    cost,
    eval_time,
    type,
    orderId: _key,
    status,
});
