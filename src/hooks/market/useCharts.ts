/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect } from 'react';
import { createChart, ColorType, LineData } from 'lightweight-charts';

/**
 * Default charts theme.
 */
export const chartsTheme = {
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
 */
export const useCharts = <T extends HTMLElement>(
    ref: RefObject<T>,
    data?: LineData[],
    theme: Partial<typeof chartsTheme> = chartsTheme,
) => {
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (!data) {
            return;
        }

        const chart = createChart(ref.current, {
            layout: {
                background: { type: ColorType.Solid, color: theme.background },
                fontFamily: theme.fontFamily,
                textColor: theme.layoutTextColor,
            },
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            grid: {
                vertLines: { color: theme.gridLineColor },
                horzLines: { color: theme.gridLineColor },
            },
        });
        chart.timeScale().fitContent();

        const lineSeries = chart.addLineSeries({ color: theme.lineColor });
        lineSeries.setData(data);

        const handleResize = () => {
            ref.current && chart.applyOptions({ width: ref.current.clientWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [ref, data, theme]);
};
