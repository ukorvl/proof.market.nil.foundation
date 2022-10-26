/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';
import { AskDto } from './AskDto';

/**
 * Ask.
 */
export type Ask = AskDto;

/**
 * Maps askDto to Ask model.
 *
 * @param {AskDto} dto - Dto.
 * @returns Bid model.
 */
export const mapToAsk = ({ timestamp, ...rest }: AskDto): Ask => ({
    ...rest,
    timestamp: dayjs(timestamp).toISOString(),
});
