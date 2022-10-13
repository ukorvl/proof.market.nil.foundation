/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';

/**
 * Props.
 */
type ChartLegendProps = {
    name: string;
    price?: string;
};

/**
 * Dashboard legend.
 *
 * @param {ChartLegendProps} props Props.
 * @returns React component.
 */
export const ChartLegend = ({ name, price }: ChartLegendProps): ReactElement => {
    return (
        <div className="chartLegend">
            <h4>{name.toUpperCase()}</h4>
            {price && <span className="text-muted">{price}</span>}
        </div>
    );
};
