/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect, useRef, useState } from 'react';
import { Placeholder, PlaceholderAnimation } from '@nilfoundation/react-components';
import { BarPrice, BarPrices, ISeriesApi, MouseEventHandler } from 'lightweight-charts';
import { useChart, useGetCircuitDashboardData } from 'src/hooks';
import { Details } from 'src/components';
import { ChartType } from 'src/enums';
import colors from 'src/styles/export.module.scss';
import { DashboardCard } from '../../common';
import { ChartLegend } from './ChartLegend';
import { ChartTypeSelect } from './ChartTypeSelect';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();
    const [chartType, setChartType] = useState(ChartType.candlestickChart);
    const [series, setSeries] = useState<ISeriesApi<'Candlestick' | 'Line'>>();
    const ref = useRef<HTMLDivElement>(null);

    const {
        chartData: { candlestickChartData, proofGenTimeData, proofGenCostData },
        loadingData,
    } = useGetCircuitDashboardData();
    console.log(candlestickChartData, proofGenTimeData);
    const { chart } = useChart(ref);

    useEffect(() => {
        if (!chart || !series) {
            return;
        }

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (param.time) {
                const price = param.seriesPrices.get(series);
                console.log(price);
                setPrice(price && price);
            }
        };

        chart && chart.subscribeCrosshairMove(crosshairMoveHandler);

        return () => {
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
        };
    }, [chart, series]);

    useEffect(() => {
        if (!chart) {
            return;
        }

        switch (chartType) {
            case ChartType.candlestickChart: {
                const candlesSeries = chart.addCandlestickSeries({
                    upColor: colors.successColor,
                    downColor: colors.dangerColor,
                    priceLineWidth: 2,
                    wickUpColor: 'red',
                });
                candlesSeries.setData(candlestickChartData);
                chart.timeScale().fitContent();
                setSeries(candlesSeries);
                break;
            }
            case ChartType.proofGetTimeChart: {
                const candlesSeries = chart.addLineSeries({ color: colors.infoColor });
                candlesSeries.setData(candlestickChartData);
                chart.timeScale().fitContent();
                setSeries(candlesSeries);
                break;
            }
            default:
                return;
        }

        return () => {
            series && chart.removeSeries(series);
        };
    }, [chartType, candlestickChartData]);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit dashboard</h4>}>
                <ChartTypeSelect
                    chartType={chartType}
                    onSelectChartType={setChartType}
                />
                <div
                    ref={ref}
                    className="circuitDashboard"
                >
                    {price && (
                        <ChartLegend
                            price={price}
                            name={chartType}
                        />
                    )}
                    {loadingData && <Placeholder animation={PlaceholderAnimation.wave} />}
                </div>
            </Details>
        </DashboardCard>
    );
};
