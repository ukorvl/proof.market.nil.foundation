/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { DashboardCard } from '../DashboardCard';
import { OrderBookTable } from './OrderBookTable';
import { Details } from '../../common';
import { useGetOrderBookData } from '../../../hooks';
import './OrderBook.scss';

/**
 * Order book.
 *
 * @returns React component.
 */
export const OrderBook = (): ReactElement => {
    const { columns, data, loadingData } = useGetOrderBookData();

    return (
        <DashboardCard>
            <Details title={<h4>Order book</h4>}>
                <h5>Orders:</h5>
                <div className="orderBook">
                    {data ? (
                        <OrderBookTable
                            data={data}
                            columns={columns}
                        />
                    ) : loadingData ? (
                        <Spinner grow />
                    ) : (
                        'Nothing selected.'
                    )}
                </div>
            </Details>
        </DashboardCard>
    );
};
