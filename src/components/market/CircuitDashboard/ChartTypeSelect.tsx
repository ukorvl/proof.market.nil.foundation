/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { ChartType } from 'src/enums';

/**
 * Props.
 */
type ChartTypeSelectProps = {
    chartType: ChartType;
    onSelectChartType: (chartType: ChartType) => void;
};

/**
 * Chart type selector.
 *
 * @param {ChartTypeSelectProps} props Props.
 * @returns React component.
 */
export const ChartTypeSelect = ({
    chartType,
    onSelectChartType,
}: ChartTypeSelectProps): ReactElement => {
    return (
        <Nav tabs>
            {Object.values(ChartType).map(x => (
                <Nav.Item
                    key={x}
                    active={x === chartType}
                    onClick={() => onSelectChartType(x)}
                    disabled={x === ChartType.proofGenCostChart}
                >
                    {x}
                </Nav.Item>
            ))}
        </Nav>
    );
};
