/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { forwardRef, ReactElement } from 'react';
import { BarPrice, BarPrices } from 'lightweight-charts';
import { Spinner } from '@nilfoundation/react-components';
import { ChartLegend } from '../ChartLegend';
import './ChartTemplate.scss';

/**
 * Props.
 */
type ChartTemplateProps = {
    price?: BarPrice | BarPrices;
    chartName: string;
    loadingData: boolean;
    emptyData: boolean;
};

/**
 * Chart template.
 *
 * @param {ChartTemplateProps} props Props.
 * @returns React component.
 */
export const ChartTemplate = forwardRef<HTMLDivElement, ChartTemplateProps>(function ChartTemplate(
    { price, chartName, loadingData, emptyData }: ChartTemplateProps,
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
            {loadingData && emptyData && <Spinner grow />}
        </div>
    );
});
