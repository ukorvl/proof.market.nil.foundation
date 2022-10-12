/**
 * @file Hooks helpers.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStateType } from './RootStateType';

/**
 * Typed use selector.
 */
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
