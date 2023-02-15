/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RouterParam } from 'src/enums';
import type { RootStateType } from 'src/redux';

/**
 * Select location object.
 *
 * @param s State.
 * @returns Location.
 */
export const selectLocation = (s: RootStateType) => s.routerState.location;

/**
 * Select statement key url param.
 *
 * @param s State.
 * @returns Statement key.
 */
export const selectUrlParamStatementName = (s: RootStateType) =>
    selectUrlParamByKey(s, RouterParam.statementName);

/**
 * Select proof key url param.
 *
 * @param s State.
 * @returns Proof key.
 */
export const selectUrlParamProofKey = (s: RootStateType) =>
    selectUrlParamByKey(s, RouterParam.proofKey);

/**
 * Select param from state.
 *
 * @param s State.
 * @param param Param to select.
 * @returns Param value or undefined.
 */
const selectUrlParamByKey = (s: RootStateType, param: RouterParam) => {
    const params = s.routerState.params;

    return params ? params[param] : undefined;
};
