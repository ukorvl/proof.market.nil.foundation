/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';
import { BidDto } from './BidDto';

/**
 * Bid.
 */
export interface Bid extends Omit<BidDto, 'timestamp'> {
    /**
     * "Browser" time, converted to Date with proper time zone offset.
     */
    timestamp: Date | null;
}

/**
 * Maps bidDto to Bid model.
 *
 * @param {BidDto} dto - Dto.
 * @returns Bid model.
 */
export const mapToBid = ({ timestamp, ...rest }: BidDto): Bid => ({
    ...rest,
    timestamp: dayjs(timestamp).toDate(),
});
