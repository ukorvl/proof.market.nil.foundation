/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import ReactJson from 'react-json-view';
import { jsonViewerTheme } from 'src/constants';
import { ProofDto } from 'src/models';

/**
 * Props.
 */
type ProofViewJsonProps = {
    proof: ProofDto;
};

/**
 * Proof JSON view.
 *
 * @param {ProofViewJsonProps} props Props.
 * @returns React component.
 */
export const ProofViewJson = ({ proof }: ProofViewJsonProps): ReactElement => {
    return (
        <div className="proofJsonViewContainer">
            <ReactJson
                src={proof}
                name={null}
                displayDataTypes={false}
                displayObjectSize={false}
                collapseStringsAfterLength={600}
                theme={jsonViewerTheme}
            />
        </div>
    );
};
