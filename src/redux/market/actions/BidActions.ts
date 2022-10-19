/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Bid } from 'src/models';

/**
 * Update bids list.
 */
export const UpdateBidsList = createAction<Bid[]>('@orders/UPDATE_BIDS_LIST');

/**
 * Add bid.
 */
export const AddBid = createAction<Bid>('@orders/ADD_BID');
