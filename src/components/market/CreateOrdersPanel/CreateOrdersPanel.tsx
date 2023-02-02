/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { useAppSelector } from 'src/redux';
import { TradeOrderType } from 'src/models';
import { socialLinks as links } from 'src/constants';
import { DashboardCard, SocialLinks } from '../../common';
import { ProtectedContent } from '../../login';
import { CreateBidForm } from '../CreateBidForm';
import { CreateOrdersTabs } from './CreateOrdersTabs';
import './CreateOrdersPanel.scss';

const socialLinks = links.filter(({ icon }) => ['discord', 'telegram'].includes(icon));

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<TradeOrderType>(TradeOrderType.buy);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedKey);

    return (
        <DashboardCard>
            <h4>Create orders</h4>
            <div className="cerateOrdersPanel">
                <ProtectedContent overlayTitle="Authorization is required to create orders">
                    <CreateOrdersTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    {tabFactory(tab, selectedCircuitId)}
                </ProtectedContent>
            </div>
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
            return (
                <div className="text-center">
                    If you wish to generate proofs, please see instructions on our{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={process.env.REACT_APP_PROOFMARKET_TOOLCHAIN_REPO}
                    >
                        <strong>toolchain repository</strong>
                    </a>
                    <p></p>
                    <div>
                        or join us on Discord or Telegram:
                        <SocialLinks socialLinks={socialLinks} />
                    </div>
                </div>
            );
        default:
            return <></>;
    }
};
