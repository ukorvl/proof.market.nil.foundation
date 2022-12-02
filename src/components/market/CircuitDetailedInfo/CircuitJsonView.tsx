/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import ReactJson from 'react-json-view';
import { jsonViewerTheme } from 'src/constants';
import { Circuit, getCircuitPublicData } from 'src/models';
import styles from './CircuitDetailedInfo.module.scss';

/**
 * Props.
 */
type CircuitJsonViewProps = {
    circuit: Circuit;
};

/**
 * Circuit json view.
 *
 * @param {CircuitJsonViewProps} props Props.
 * @returns React component.
 */
export const CircuitJsonView = ({ circuit }: CircuitJsonViewProps): ReactElement => {
    return (
        <div className={styles.jsonView}>
            <ReactJson
                src={getCircuitPublicData(circuit)}
                collapsed={1}
                name={null}
                displayDataTypes={false}
                displayObjectSize={false}
                theme={jsonViewerTheme}
            />
        </div>
    );
};
