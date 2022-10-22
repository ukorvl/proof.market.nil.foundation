/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { BarPrice, BarPrices } from 'lightweight-charts';
import './ChartLegend.scss';

/**
 * Props.
 */
type ChartLegendProps = {
    name: string;
    price?: BarPrice | BarPrices;
};

/**
 * Dashboard legend.
 *
 * @param {ChartLegendProps} props Props.
 * @returns React component.
 */
export const ChartLegend = ({ name, price }: ChartLegendProps): ReactElement => {
    const displayPrice = () =>
        typeof price === 'object' ? (
            Object.keys(price).map(x => (
                <span
                    className="text-muted"
                    key={x}
                >
                    {`${x}: ${price[x as keyof BarPrices]}`}
                </span>
            ))
        ) : (
            <span className="text-muted">{price}</span>
        );

    return (
        <div className="chartLegend">
            <h5>{name.toUpperCase()}</h5>
            {displayPrice()}
        </div>
    );
};
