/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { LoginData } from './LoginData';

/**
 * Login data.
 */
export type RegisterData = LoginData & {
    /**
     * Email.
     */
    email?: string;
};
