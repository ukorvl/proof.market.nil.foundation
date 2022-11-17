/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { BarPrice, BarPrices } from 'lightweight-charts';
import styles from './ChartLegend.module.scss';

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
    return (
        <div className={styles.chartLegend}>
            <h5 className={styles.chartName}>{name.toUpperCase()}</h5>
            {typeof price === 'object' ? (
                Object.keys(price).map(x => (
                    <div
                        className="text-muted"
                        key={x}
                    >
                        {`${x}: ${price[x as keyof BarPrices]?.toFixed(2)}`}
                    </div>
                ))
            ) : (
                <div className="text-muted">{price?.toFixed(2)}</div>
            )}
        </div>
    );
};
