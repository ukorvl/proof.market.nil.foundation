/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useGetOrderBookData, UseGetOrderBookDataReturnType } from 'src/hooks';
import { OrderBookTable } from './OrderBookTable';
import { Details, DashboardCard } from '../../common';
import './OrderBook.scss';

/**
 * Order book.
 *
 * @returns React component.
 */
export const OrderBook = (): ReactElement => {
    const data = useGetOrderBookData();

    return (
        <DashboardCard>
            <Details title={<h4>Order book</h4>}>
                <div className="orderBook">{OrderBookViewFactory({ ...data })}</div>
            </Details>
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
}: UseGetOrderBookDataReturnType) => {
    switch (true) {
        case loadingData:
            return <Spinner grow />;
        case isError:
            return <h5>Error while loading data.</h5>;
        case !!data.length:
            return (
                <OrderBookTable
                    data={data}
                    columns={columns}
                    lastOrderData={lastOrderData}
                />
            );
        default:
            return <h5>No orders.</h5>;
    }
};
