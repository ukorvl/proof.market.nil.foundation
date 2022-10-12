/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { DashboardCard } from '../DashboardCard';
import { Details } from '../../common';
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
            <Details title={<h4>Detailed {currentSelectedCircuit?.id} info</h4>}>
                {currentSelectedCircuit ? (
                    <ReactJson
                        src={currentSelectedCircuit}
                        collapsed={1}
                        name={null}
                        displayDataTypes={false}
                        theme={jsonViewerTheme}
                    />
                ) : (
                    <div>Nothing is selected.</div>
                )}
            </Details>
        </DashboardCard>
    );
};
