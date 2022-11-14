/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useCallback, useState } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import { Row } from 'react-table';
import { RemoveAsk, RemoveBid, useAppSelector } from 'src/redux';
import { useGetManageOrdersData } from 'src/hooks';
import { ManageOrdersData, TradeOrderType } from 'src/models';
import { removeAsk, removeBid } from 'src/api';
import { DashboardCard, Details } from '../../common';
import { ManageOrdersTab } from './ManageOrdersTab';
import { ManageOrdersPanelTabs } from './ManageOrdersPanelTabs';
import { ActiveOrdersTable } from './ActiveOrdersTable';
import { HistoryOrdersTable } from './HistoryOrdersTable';
import { ManageOrdersPanelContext } from './ManageOrdersPanelContext';
import { ToolbarPanel } from './ToolbarPanel';
import './ManageOrdersPanel.scss';

/**
 * Manage orders panel.
 *
 * @returns React component.
 */
export const ManageOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<ManageOrdersTab>(ManageOrdersTab.active);
    const [selectedRow, setSelectedRow] = useState<Row<ManageOrdersData> | null>(null);
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const { isError, loadingData, activeOrdersData, historyOrdersData } = useGetManageOrdersData();

    const onAcceptRemoveOrder = useCallback(async () => {
        setProcessing(true);

        if (!selectedRow) {
            return;
        }

        try {
            const { orderId, type } = selectedRow.values;
            const fetcher = type === TradeOrderType.buy ? removeBid : removeAsk;
            const action = type === TradeOrderType.buy ? RemoveBid : RemoveAsk;

            await fetcher(orderId);
            dispatch(action(orderId));
            setSelectedRow(null);
        } catch (e) {
            // TODO Handle error
        } finally {
            setProcessing(false);
        }
    }, [setProcessing, selectedRow, setSelectedRow, dispatch]);

    const onDecline = useCallback(() => {
        setSelectedRow(null);
    }, [setSelectedRow]);

    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}>
                <ManageOrdersPanelContext.Provider
                    value={{
                        processing,
                        setProcessing,
                        selectedRow,
                        setSelectedRow,
                    }}
                >
                    <div className="manageOrdersPanel">
                        <ManageOrdersPanelTabs
                            currentTab={tab}
                            onSetTab={setTab}
                        />
                        {selectedCircuitId !== undefined ? (
                            tabFactory(
                                tab,
                                isError,
                                loadingData,
                                tab === ManageOrdersTab.active
                                    ? activeOrdersData
                                    : historyOrdersData,
                            )
                        ) : (
                            <h4>Please, select circuit to display orders.</h4>
                        )}
                        {selectedRow !== null && (
                            <ToolbarPanel
                                onAccept={onAcceptRemoveOrder}
                                onDecline={onDecline}
                                processing={processing}
                                message="Proceed removing order?"
                            />
                        )}
                    </div>
                </ManageOrdersPanelContext.Provider>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab - Tab.
 * @param error - Error.
 * @param loading - Loading.
 * @param data - Data.
 * @returns React Element.
 */
const tabFactory = (
    tab: ManageOrdersTab,
    error: boolean,
    loading: boolean,
    data: ManageOrdersData[],
) => {
    if (error) {
        return <h5>Error while loading data.</h5>;
    }

    if (data.length === 0) {
        return loading ? <Spinner grow /> : <h5>No orders.</h5>;
    }

    switch (tab) {
        case ManageOrdersTab.active:
            return <ActiveOrdersTable data={data} />;
        case ManageOrdersTab.history:
            return <HistoryOrdersTable data={data} />;
        default:
            return <></>;
    }
};
