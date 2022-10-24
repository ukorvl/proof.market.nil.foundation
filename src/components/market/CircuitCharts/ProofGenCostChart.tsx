/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect, useRef, useState } from 'react';
import { BarPrice, BarPrices, MouseEventHandler } from 'lightweight-charts';
import { useChart, useGetCircuitDashboardData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from './ChartTemplate';

/**
 * Proof gen cost chart.
 *
 * @returns React component.
 */
export const ProofGenCostChart = (): ReactElement => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();
    const ref = useRef<HTMLDivElement>(null);
    const { chart } = useChart(ref);
    const {
        chartData: { proofGenCostData },
        loadingData,
    } = useGetCircuitDashboardData();

    useEffect(() => {
        if (!chart) {
            return;
        }

        const lineSeries = chart.addLineSeries({
            color: colors.infoColor,
        });

        lineSeries.setData(proofGenCostData);

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (param.time) {
                const price = param.seriesPrices.get(lineSeries);
                price && setPrice(price);
            }
        };

        chart.subscribeCrosshairMove(crosshairMoveHandler);
        chart.timeScale().fitContent();

        return () => {
            lineSeries && chart.removeSeries(lineSeries);
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
            setPrice(undefined);
        };
    }, [proofGenCostData, chart]);

    return (
        <ChartTemplate
            loadingData={loadingData}
            price={price}
            chartName="Proof Gen Cost, USD"
            ref={ref}
        />
    );
};
