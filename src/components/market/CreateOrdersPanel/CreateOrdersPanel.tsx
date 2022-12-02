/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { useAppSelector } from 'src/redux';
import { TradeOrderType } from 'src/models';
import { DashboardCard, Details, Overlay } from '../../common';
import { CreateBidForm } from '../CreateBidForm';
import { CreateAskForm } from '../CreateAskForm';
import { CreateOrdersTabs } from './CreateOrdersTabs';
import { RequestRegisterCard } from './RequestRegisterCard';
import './CreateOrdersPanel.scss';

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<TradeOrderType>(TradeOrderType.buy);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);

    return (
        <DashboardCard>
            <Details title={<h4>Create orders</h4>}>
                <div className="cerateOrdersPanel">
                    <CreateOrdersTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    <Overlay>
                        <RequestRegisterCard />
                    </Overlay>
                    {tabFactory(tab, selectedCircuitId)}
                </div>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab Selected tab.
 * @param selectedCircuitId Selected circuit id.
 * @returns React Element.
 */
const tabFactory = (tab: TradeOrderType, selectedCircuitId?: string) => {
    if (selectedCircuitId === undefined) {
        return <h5>Please, select circuit to create orders.</h5>;
    }

    switch (tab) {
        case TradeOrderType.buy:
            return <CreateBidForm />;
        case TradeOrderType.sell:
            return <CreateAskForm />;
        default:
            return <></>;
    }
};
