/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect, useMemo, useState } from 'react';
import { createChart, ColorType, LineData } from 'lightweight-charts';

type UseChartsReturnType = {
    price?: string;
};

/**
 * Default charts theme.
 */
const chartsTheme = {
    background: '#151515',
    lineColor: '#2677f0',
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
    data?: LineData[],
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

        if (!data) {
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

        const lineSeries = chart.addLineSeries({ color: mergedTheme.lineColor });
        lineSeries.setData(data);

        const handleResize = () => {
            ref.current && chart.applyOptions({ width: ref.current.clientWidth });
        };

        chart.subscribeCrosshairMove(param => {
            if (param.time) {
                const price = param.seriesPrices.get(lineSeries);
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
