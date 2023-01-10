/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useGetOrderBookData, UseGetOrderBookDataReturnType, useLocalStorage } from 'src/hooks';
import { OrderBookPriceStep } from 'src/enums';
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
    const [priceStep, setPriceStep] = useLocalStorage<keyof typeof OrderBookPriceStep>(
        'orderBookPriceStep',
        '0.001',
    );
    const [displayUserOrders, setDisplayUserOrders] = useLocalStorage<boolean>(
        'displayUserOrdersInOrderbook',
        true,
    );
    const orderBookData = useGetOrderBookData({ priceStep });

    return (
        <DashboardCard>
            <OrderBookSettingsContext.Provider
                value={{ priceStep, setPriceStep, displayUserOrders, setDisplayUserOrders }}
            >
                <div className={styles.header}>
                    <h4>Order book</h4>
                    <OrderBookToolbar
                        disabled={!orderBookData.data.length && orderBookData.loadingData}
                    />
                </div>
                <div className={styles.orderBook}>{OrderBookViewFactory(orderBookData)}</div>
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
    columns,
    loadingData,
    isError,
    lastOrderData,
    maxVolume,
}: UseGetOrderBookDataReturnType) => {
    switch (true) {
        case loadingData && !data.length:
            return <Spinner grow />;
        case isError:
            return <h5>Error while loading data.</h5>;
        case !!data.length:
            return (
                <OrderBookTable
                    data={data}
                    columns={columns}
                    lastOrderData={lastOrderData}
                    maxVolume={maxVolume}
                />
            );
        default:
            return <h5>No orders.</h5>;
    }
};
