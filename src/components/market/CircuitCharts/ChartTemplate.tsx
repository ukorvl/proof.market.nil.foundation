/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { forwardRef, ReactElement } from 'react';
import { BarPrice, BarPrices } from 'lightweight-charts';
import { Placeholder, PlaceholderAnimation } from '@nilfoundation/react-components';
import { ChartLegend } from '../ChartLegend';
import './ChartTemplate.scss';

/**
 * Props.
 */
type ChartTemplateProps = {
    price?: BarPrice | BarPrices;
    chartName: string;
    loadingData: boolean;
};

/**
 * Chart template.
 *
 * @param {ChartTemplateProps} props Props.
 * @returns React component.
 */
export const ChartTemplate = forwardRef<HTMLDivElement, ChartTemplateProps>(function ChartTemplate(
    { price, chartName, loadingData }: ChartTemplateProps,
    ref,
): ReactElement {
    return (
        <div
            ref={ref}
            className="circuitChart"
        >
            <ChartLegend
                price={price}
                name={chartName}
            />
            {loadingData && <Placeholder animation={PlaceholderAnimation.wave} />}
        </div>
    );
});
