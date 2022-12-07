/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
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
    Range,
    SeriesMarker,
    UTCTimestamp,
    WhitespaceData,
    HistogramData,
    HistogramStyleOptions,
} from 'lightweight-charts';
import { DateUnit } from 'src/enums';
import colors from 'src/styles/export.module.scss';

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
    visibleRange?: DateUnit;
    markers?: SeriesMarker<UTCTimestamp>[];
    volumes?: (WhitespaceData | HistogramData)[];
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
    visibleRange,
    markers,
    volumes,
}: UseRenderChartDataProps<T>): UseRenderChartDataReturnType => {
    const [price, setPrice] = useState<BarPrice | BarPrices>();

    useEffect(() => {
        if (!chart) {
            return;
        }

        const addSeriesMethod =
            seriesType === 'Line'
                ? chart.addLineSeries.bind(chart, {
                      ...seriesDefaultOptions,
                      ...options,
                  } as DeepPartial<LineStyleOptions & SeriesOptionsCommon>)
                : chart.addCandlestickSeries.bind(chart, {
                      ...seriesDefaultOptions,
                      ...options,
                  } as DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>);

        const series = addSeriesMethod();
        series.setData(seriesData);
        markers && series.setMarkers(markers);

        const volumeSeries = chart.addHistogramSeries(volumeSeriesDefaultOptions);
        volumes && volumeSeries.setData(volumes);

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (!param.time) {
                setPrice(undefined);
                return;
            }

            const price = param.seriesPrices.get(series);
            price && setPrice(price);
        };

        chart.subscribeCrosshairMove(crosshairMoveHandler);

        return () => {
            chart.removeSeries(series);
            chart.removeSeries(volumeSeries);
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
            setPrice(undefined);
        };
    }, [seriesData, chart, seriesType, options, markers, volumes]);

    useEffect(() => {
        if (!chart || !seriesData.length) {
            return;
        }

        if (!visibleRange) {
            chart.timeScale().fitContent();
            return;
        }

        chart.timeScale().setVisibleLogicalRange(getDataRange(seriesData.length, visibleRange));
    }, [chart, visibleRange, seriesData]);

    return { price };
};

/**
 * Series default options.
 */
const seriesDefaultOptions: Partial<SeriesOptionsCommon> = {
    priceFormat: {
        type: 'price',
        precision: 4,
        minMove: 0.0001,
    },
};

/**
 * Volume series default options.
 */
const volumeSeriesDefaultOptions: DeepPartial<HistogramStyleOptions & SeriesOptionsCommon> = {
    color: colors.transparentBaseLightColor,
    priceFormat: {
        type: 'volume',
    },
    priceScaleId: '',
    scaleMargins: {
        top: 0.8,
        bottom: 0,
    },
};

/**
 * Creates chart data Range {@link Range} object, subtracting distance from provided right edge date.
 *
 * @param rightEdge Last date in range.
 * @param visibleRange Visible range.
 * @returns Range.
 */
const getDataRange = (rightEdge: number, visibleRange: DateUnit): Range<number> => {
    let distance = 0;

    switch (visibleRange) {
        case DateUnit.minute:
            distance = 60;
            break;
        case DateUnit.hour:
            distance = 24;
            break;
        case DateUnit.day:
        case DateUnit.quaterMinute:
        case DateUnit.halfHour:
            distance = 30;
    }

    return {
        from: rightEdge - distance,
        to: rightEdge,
    };
};
