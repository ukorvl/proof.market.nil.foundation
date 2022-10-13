/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect, useMemo } from 'react';
import { createChart, ColorType, LineData } from 'lightweight-charts';

/**
 * Default charts theme.
 */
const chartsTheme = {
    background: '#151515',
    lineColor: '#2677f0',
    fontFamily: 'Roboto',
    layoutTextColor: '#d3d3d3',
    gridLineColor: '#3c3c3c',
    areaTopColor: '#2677f0',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
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
    theme?: Partial<typeof chartsTheme>,
): void => {
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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [ref, data, mergedTheme]);
};
