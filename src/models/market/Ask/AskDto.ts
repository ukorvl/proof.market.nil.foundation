/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Proof } from '../Proof';
import { TradeOrderStatus } from '../TradeOrderStatus';
import { CreateAsk } from './CreateAsk';

/**
 * Proposal dto.
 */
export interface AskDto extends CreateAsk {
    /**
     * Id.
     */
    id: string;
    /**
     * Offer status.
     */
    status: TradeOrderStatus;
    /**
     * Proof id (when generated, either - null).
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
