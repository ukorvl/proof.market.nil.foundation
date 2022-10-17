/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';
import { AskDto } from './AskDto';

/**
 * Ask.
 */
export interface Ask extends Omit<AskDto, 'timestamp'> {
    /**
     * "Browser" time, converted to Date with proper time zone offset.
     */
    timestamp: Date | null;
}

/**
 * Maps askDto to Ask model.
 *
 * @param {AskDto} dto - Dto.
 * @returns Bid model.
 */
export const mapToAsk = ({ timestamp, ...rest }: AskDto): Ask => ({
    ...rest,
    timestamp: dayjs(timestamp).toDate(),
});
