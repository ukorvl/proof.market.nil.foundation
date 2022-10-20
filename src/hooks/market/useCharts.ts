/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect, useMemo, useState } from 'react';
import { createChart, ColorType, CandlestickData } from 'lightweight-charts';

/**
 * Return type.
 */
type UseChartsReturnType = {
    /**
     * Current price value (when user hovers chart) - can be used to render Legend.
     */
    price?: string;
};

/**
 * Default charts theme.
 */
const chartsTheme = {
    background: '#151515',
    lineColor: '#2677f0',
    upColor: '#57965a',
    downColor: '#f44336',
    fontFamily: 'Roboto',
    layoutTextColor: '#d3d3d3',
    gridLineColor: '#3c3c3c',
};

/**
 * Hook to create charts.
 *
 * @param ref - Ref.
 * @param data - Chart data.
 * @param theme - Theme.
 * @returns {UseChartsReturnType}.
 */
export const useCharts = <T extends HTMLElement>(
    ref: RefObject<T>,
    data?: CandlestickData[],
    theme?: Partial<typeof chartsTheme>,
): UseChartsReturnType => {
    const [price, setPrice] = useState<string>();
    const mergedTheme = useMemo(() => {
        return theme ? { ...chartsTheme, ...theme } : chartsTheme;
    }, [theme]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (!data || !data.length) {
            return;
        }

        const chart = createChart(ref.current, {
            layout: {
                background: { type: ColorType.Solid, color: mergedTheme.background },
                fontFamily: mergedTheme.fontFamily,
                textColor: mergedTheme.layoutTextColor,
            },
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            grid: {
                vertLines: { color: mergedTheme.gridLineColor },
                horzLines: { color: mergedTheme.gridLineColor },
            },
        });
        chart.timeScale().fitContent();

        const candlesSeries = chart.addCandlestickSeries({
            upColor: mergedTheme.upColor,
            downColor: mergedTheme.downColor,
        });
        candlesSeries.setData(data);

        const handleResize = () => {
            ref.current && chart.applyOptions({ width: ref.current.clientWidth });
        };

        chart.subscribeCrosshairMove(param => {
            if (param.time) {
                const price = param.seriesPrices.get(candlesSeries);
                setPrice(price && price.toString());
            }
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [ref, data, mergedTheme]);

    return { price };
};
