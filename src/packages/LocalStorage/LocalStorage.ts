/**
 * @file Local storage API.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Get localStorage item.
 *
 * @param ItemKey - Key.
 * @returns Item value.
 */
export const getItemFromLocalStorage = <T>(ItemKey: string): T | undefined => {
    try {
        const serialisedValue = localStorage.getItem(ItemKey);
        if (serialisedValue === null) {
            return undefined;
        }
        return JSON.parse(serialisedValue);
    } catch {
        return undefined;
    }
};

/**
 * Set localStorage item.
 *
 * @param ItemKey - Key.
 * @param ItemValue - Value.
 */
export const setItemIntoLocalStorage = <T>(ItemKey: string, ItemValue: T): void => {
    try {
        const serialisedValue = JSON.stringify(ItemValue);
        localStorage.setItem(ItemKey, serialisedValue);
    } catch {
        // Do nothing
    }
};

/**
 * Remove item from localStorage.
 *
 * @param ItemKey - Key.
 */
export const removeItemFromLocalStorage = (ItemKey: string): void => {
    try {
        localStorage.removeItem(ItemKey);
    } catch {
        // Do nothing
    }
};
