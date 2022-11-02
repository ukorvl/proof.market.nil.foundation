/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect, useRef, useState } from 'react';
import {
    IChartApi,
    BarPrice,
    BarPrices,
    LineData,
    CandlestickData,
    MouseEventHandler,
    DeepPartial,
    CandlestickStyleOptions,
    SeriesOptionsCommon,
    LineStyleOptions,
} from 'lightweight-charts';

/**
 * Return type.
 */
type UseRenderChartDataReturnType = {
    /**
     * Current price value (when user hovers chart).
     */
    price?: BarPrice | BarPrices;
};

/**
 * Hook parameters.
 */
type UseRenderChartDataProps<T extends 'Line' | 'Candlestick'> = {
    seriesType: T;
    seriesData: T extends 'Line' ? LineData[] : CandlestickData[];
    chart?: IChartApi;
    options?: DeepPartial<
        (T extends 'Line' ? LineStyleOptions : CandlestickStyleOptions) & SeriesOptionsCommon
    >;
};

/**
 * Hook to manage rendering chart data.
 *
 * @param {UseRenderChartDataProps} parameters Parameters.
 * @returns Current price.
 */
export const useRenderChartData = <T extends 'Line' | 'Candlestick'>({
    seriesType,
    seriesData,
    chart,
    options,
}: UseRenderChartDataProps<T>): UseRenderChartDataReturnType => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();
    const seriesMountedRef = useRef(false);

    useEffect(() => {
        if (!chart) {
            return;
        }

        const addSeriesMethod =
            seriesType === 'Line'
                ? chart.addLineSeries.bind(
                      chart,
                      options as DeepPartial<LineStyleOptions & SeriesOptionsCommon>,
                  )
                : chart.addCandlestickSeries.bind(
                      chart,
                      options as DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>,
                  );

        const series = addSeriesMethod();
        series.applyOptions(seriesOptions);
        series.setData(seriesData);

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (!param.time) {
                setPrice(undefined);
                return;
            }

            const price = param.seriesPrices.get(series);
            price && setPrice(price);
        };

        chart.subscribeCrosshairMove(crosshairMoveHandler);

        !seriesMountedRef.current && chart.timeScale().fitContent();
        if (seriesData.length) {
            seriesMountedRef.current = true;
        }

        return () => {
            chart.removeSeries(series);
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
            setPrice(undefined);
        };
    }, [seriesData, chart, seriesType, options]);

    return { price };
};

/**
 * Series options.
 */
const seriesOptions: Partial<SeriesOptionsCommon> = {
    priceFormat: {
        type: 'price',
        precision: 4,
        minMove: 0.0001,
    },
};
