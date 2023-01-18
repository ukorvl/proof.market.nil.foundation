/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Login data.
 */
export type RegisterData = {
    /**
     * User name.
     */
    user: string;
    /**
     * Password.
     */
    passwd: string;
    /**
     * Email.
     */
    email?: string;
};
