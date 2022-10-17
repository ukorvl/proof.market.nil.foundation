/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CreateBid } from './CreateBid';
import { TradeOrderStatus } from '../TradeOrderStatus';
import { Proof } from '../Proof';

/**
 * Bid.
 */
export interface BidDto extends CreateBid {
    /**
     * Id.
     */
    id: string;
    /**
     * Order status.
     */
    status: TradeOrderStatus;
    /**
     * Proof (when generated, either - null).
     */
    proof: Proof['id'] | null;
    /**
     * Time, when bid was accepted, either - null.
     */
    timestamp: string | null;
    /**
     * ?
     */
    order: null;
}
