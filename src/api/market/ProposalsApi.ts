/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Proposal, ProposalDto } from '../../models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Create Proposal.
 *
 * @param data Proposal dto.
 * @returns Proposal.
 */
export const createProposal = (data: ProposalDto): Promise<Proposal> =>
    httpFetcher.post('document?relation=order', data).then((x: any) => x);
