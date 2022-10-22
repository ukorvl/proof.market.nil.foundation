/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { BarPrice, BarPrices } from 'lightweight-charts';

/**
 * Props.
 */
type ProofCostChartProps = {
    name: string;
    price?: BarPrice | BarPrices;
};

/**
 * Dashboard legend.
 *
 * @param {ChartLegendProps} props Props.
 * @returns React component.
 */
export const ProofCostChart = ({ name, price }: ProofCostChartProps): ReactElement => {
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
