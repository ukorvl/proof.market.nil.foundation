/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { DashboardCard } from '../DashboardCard';
import { selectCurrentCircuit } from '../../../redux';
import { jsonViewerTheme } from '../../../constants';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitDetailedInfo = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);

    return (
        <DashboardCard>
            {currentSelectedCircuit?.id}
            <ReactJson
                src={{}}
                collapsed={1}
                name={null}
                displayDataTypes={false}
                theme={jsonViewerTheme}
            />
        </DashboardCard>
    );
};
