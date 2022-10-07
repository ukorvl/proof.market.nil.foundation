/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Currency } from '../../../enums';

/**
 * Update selected currency.
 */
export const UpdateCurrency = createAction<Currency>('@currency/UPDATE');
