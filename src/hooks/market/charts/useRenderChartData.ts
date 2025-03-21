/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import type {
    IChartApi,
    BarData,
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
    ISeriesApi,
} from 'lightweight-charts';
import { MismatchDirection } from 'lightweight-charts';
import { DateUnit } from '@/enums';
import colors from '@/styles/export.module.scss';

/**
 * Series type.
 */
type SeriesType = 'Line' | 'Candlestick';

/**
 * Return type.
 */
type UseRenderChartDataReturnType = {
    /**
     * Current chart data (when user hovers chart).
     */
    currentChartData?: LineData | BarData | WhitespaceData;
};

/**
 * Hook parameters.
 */
type UseRenderChartDataProps<T extends SeriesType> = {
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
export const useRenderChartData = <T extends SeriesType>({
    seriesType,
    seriesData,
    chart,
    options,
    visibleRange,
    markers,
    volumes,
}: UseRenderChartDataProps<T>): UseRenderChartDataReturnType => {
    const [currentChartData, setCurrentChartData] = useState<LineData | BarData | WhitespaceData>();

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
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        });
        volumes && volumeSeries.setData(volumes);

        const setLastBarChartData = () => {
            const bar = getLastBar(series);
            bar && setCurrentChartData(bar);
        };

        const crosshairMoveHandler: MouseEventHandler = param => {
            if (!param?.time) {
                setLastBarChartData();
                return;
            }

            const hoveredChartItemData = param.seriesData.get(series);
            hoveredChartItemData && setCurrentChartData(hoveredChartItemData);
        };

        chart.subscribeCrosshairMove(crosshairMoveHandler);
        setLastBarChartData();

        return () => {
            chart.removeSeries(series);
            chart.removeSeries(volumeSeries);
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
            setCurrentChartData(undefined);
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

    return { currentChartData };
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
    priceScaleId: 'left',
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

/**
 * Get last series data.
 *
 * @param series Series.
 * @returns Last series bar.
 */
const getLastBar = <T extends SeriesType>(series: ISeriesApi<T>) => {
    return series.dataByIndex(Infinity, MismatchDirection.NearestLeft) ?? undefined;
};
