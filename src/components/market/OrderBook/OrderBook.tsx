/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import type { UseGetOrderBookDataReturnType } from 'src/hooks';
import { useLocalStorage } from 'src/hooks';
import { siteMoneyTickerAbbreviation } from 'src/constants';
import { selectOrderBookData, useAppSelector } from 'src/redux';
import type { LastOrderData, OrderBookData } from 'src/models';
import { OrderBookTable } from './OrderBookTable';
import { OrderBookSettingsContext } from './OrderBookSettingsContext';
import { DashboardCard } from '../../common';
import { OrderBookToolbar } from './OrderBookToolbar';
import styles from './OrderBook.module.scss';

/**
 * Order book.
 *
 * @returns React component.
 */
export const OrderBook = (): ReactElement => {
    const [displayUserOrders, setDisplayUserOrders] = useLocalStorage<boolean>(
        'displayUserOrdersInOrderbook',
        true,
    );

    const data = useAppSelector(selectOrderBookData, deepEqual);
    const isLoading = useAppSelector(s => s.orderBookState.isLoading);
    const gettingDataError = useAppSelector(s => s.orderBookState.hasApiError);

    return (
        <DashboardCard>
            <OrderBookSettingsContext.Provider value={{ displayUserOrders, setDisplayUserOrders }}>
                <div className={styles.header}>
                    <h4>Order book</h4>
                    <OrderBookToolbar disabled={isLoading} />
                </div>
                <div className={styles.orderBook}>
                    {OrderBookViewFactory({
                        data,
                        isLoading,
                        isError: gettingDataError,
                        lastOrderData: { type: 'grow' },
                    })}
                </div>
            </OrderBookSettingsContext.Provider>
        </DashboardCard>
    );
};

/**
 * Renders order book view.
 *
 * @param {UseGetOrderBookDataReturnType} props Props.
 * @returns React element.
 */
const OrderBookViewFactory = ({
    data,
    isLoading,
    isError,
    lastOrderData,
}: {
    data: OrderBookData;
    isLoading: boolean;
    isError: boolean;
    lastOrderData: LastOrderData;
}) => {
    const { asks, bids } = data;
    console.log(data);

    switch (true) {
        case isLoading && !asks.length && !bids.length:
            return <Spinner grow />;
        case isError:
            return <h5>Error while loading data.</h5>;
        case !!asks.length || !!bids.length:
            return (
                <>
                    <OrderBookTable
                        type="asks"
                        data={asks}
                    />
                    {lastOrderData && (
                        <div className={styles.lastDeal}>
                            <div className={styles.lastDealTitle}>Last deal:</div>
                            {lastOrderData.cost && (
                                <div className={`${lastOrderData.type}TextColor`}>
                                    {`${lastOrderData.cost.toFixed(
                                        4,
                                    )} ${siteMoneyTickerAbbreviation}`}
                                </div>
                            )}
                        </div>
                    )}
                    <OrderBookTable
                        type="bids"
                        data={bids}
                    />
                </>
            );
        default:
            return <h5>No orders.</h5>;
    }
};
