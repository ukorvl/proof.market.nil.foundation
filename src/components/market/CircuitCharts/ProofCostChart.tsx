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
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofCostChart = (): ReactElement => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();
    const ref = useRef<HTMLDivElement>(null);
    const { chart } = useChart(ref);
    const {
        chartData: { candlestickChartData },
        loadingData,
    } = useGetCircuitDashboardData();

    useEffect(() => {
        if (!chart) {
            return;
        }

        const candlesSeries = chart.addCandlestickSeries({
            upColor: colors.successColor,
            downColor: colors.dangerColor,
            priceLineWidth: 2,
        });

        candlesSeries.setData(candlestickChartData);

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (param.time) {
                const price = param.seriesPrices.get(candlesSeries);
                price && setPrice(price);
            }
        };

        chart.subscribeCrosshairMove(crosshairMoveHandler);
        chart.timeScale().fitContent();

        return () => {
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
        };
    }, [candlestickChartData, chart]);

    return (
        <ChartTemplate
            loadingData={loadingData}
            price={price}
            chartName="Proof cost"
            ref={ref}
        />
    );
};
