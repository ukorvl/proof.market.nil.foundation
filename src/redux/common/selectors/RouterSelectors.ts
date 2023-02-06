/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RouterParam } from 'src/enums';
import type {} from 'src/models';
import type { RootStateType } from 'src/redux';

/**
 * Select navigate function.
 *
 * @param s State.
 * @returns Navigate function.
 */
export const selectNavigate = (s: RootStateType) => s.routerState.navigate;

/**
 * Select statement key url param.
 *
 * @param s State.
 * @returns Statement key.
 */
export const selectUrlParamStatementKey = (s: RootStateType) =>
    selectUrlParamByKey(s, RouterParam.statementKey);

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
