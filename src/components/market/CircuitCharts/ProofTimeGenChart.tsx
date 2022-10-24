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
export const ProofTimeGenChart = (): ReactElement => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();
    const ref = useRef<HTMLDivElement>(null);
    const { chart } = useChart(ref);
    const {
        chartData: { proofGenTimeData },
        loadingData,
    } = useGetCircuitDashboardData();

    useEffect(() => {
        if (!chart) {
            return;
        }

        const lineSeries = chart.addLineSeries({
            color: colors.infoColor,
        });

        lineSeries.setData(proofGenTimeData);

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
    }, [proofGenTimeData, chart]);

    return (
        <ChartTemplate
            loadingData={loadingData}
            price={price}
            chartName="Proof Gen Time, ms"
            ref={ref}
        />
    );
};
