/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useMemo, useRef } from 'react';
import {
    CandlestickData,
    CandlestickStyleOptions,
    ChartOptions,
    DeepPartial,
    LineData,
    LineStyleOptions,
    SeriesOptionsCommon,
    UTCTimestamp,
} from 'lightweight-charts';
import { Spinner } from '@nilfoundation/react-components';
import { useChart, useRenderChartData } from 'src/hooks';
import { formatUTCTimestamp } from 'src/utils';
import { getDateFormatBasedOnDateUnit } from 'src/enums';
import { ChartSettingsContext } from '../CircuitDashboard';
import { ChartLegend } from '../ChartLegend';
import './ChartTemplate.scss';

/**
 * Props.
 */
type ChartTemplateProps<T extends 'Line' | 'Candlestick'> = {
    chartName: string;
    loadingData: boolean;
    seriesType: T;
    seriesData: T extends 'Line' ? LineData[] : CandlestickData[];
    seriesOptions?: DeepPartial<
        (T extends 'Line' ? LineStyleOptions : CandlestickStyleOptions) & SeriesOptionsCommon
    >;
    chartOptions?: DeepPartial<ChartOptions>;
};

/**
 * Chart template.
 *
 * @param {ChartTemplateProps} props Props.
 * @returns React component.
 */
export const ChartTemplate = <T extends 'Line' | 'Candlestick'>({
    chartName,
    loadingData,
    seriesType,
    seriesData,
    seriesOptions,
    chartOptions,
}: ChartTemplateProps<T>): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const { dataRange } = useContext(ChartSettingsContext);
    const options = useMemo(
        () => ({
            ...chartOptions,
            localization: {
                timeFormatter: (t: UTCTimestamp) =>
                    formatUTCTimestamp(t, getDateFormatBasedOnDateUnit(dataRange)),
            },
            timeScale: {
                tickMarkFormatter: (t: UTCTimestamp) =>
                    formatUTCTimestamp(t, getDateFormatBasedOnDateUnit(dataRange)),
                fixRightEdge: true,
            },
        }),
        [chartOptions, dataRange],
    );

    const { chart } = useChart({ ref, options });

    const { price } = useRenderChartData({
        seriesType,
        seriesData,
        chart,
        options: seriesOptions,
        visibleRange: dataRange,
    });

    return (
        <div
            ref={ref}
            className="circuitChart"
        >
            <ChartLegend
                price={price}
                name={chartName}
            />
            {loadingData && seriesData.length === 0 && <Spinner grow />}
        </div>
    );
};
