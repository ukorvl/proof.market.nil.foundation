/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import {
    useAppSelector,
    selectCurrentCircuitCurrentUserCreatedBids,
    selectCurrentCircuitCurrentUserCompletedBids,
    selectCurrentCircuitCurrentUserCreatedAsks,
    selectCurrentCircuitCurrentUserCompletedAsks,
} from 'src/redux';
import { Ask, Bid, ManageOrdersData, TradeOrderType } from 'src/models';
import { formatDate } from 'src/utils';

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
    const createdBids = useSelector(selectCurrentCircuitCurrentUserCreatedBids, deepEqual);
    const completedBids = useSelector(selectCurrentCircuitCurrentUserCompletedBids, deepEqual);
    const createdAsks = useSelector(selectCurrentCircuitCurrentUserCreatedAsks, deepEqual);
    const completedAsks = useSelector(selectCurrentCircuitCurrentUserCompletedAsks, deepEqual);
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
    { init_time, timestamp, cost, eval_time, id }: T,
    type: TradeOrderType,
): ManageOrdersData => ({
    init_time: formatDate(init_time, 'DD.MM HH:mm'),
    timestamp: formatDate(timestamp!, 'DD.MM HH:mm'),
    cost,
    eval_time,
    type,
    orderId: id,
});
