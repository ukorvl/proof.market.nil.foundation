/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback } from 'react';

/**
 * Hook to download data as json.
 *
 * @param fileName Name of downloaded file.
 * @param [data] Data.
 * @returns Callback to download data as json file.
 */
export const useDownloadJsonFile = (fileName: string, data?: BlobPart): (() => void) => {
    const downloadJson = useCallback(() => {
        if (!data) {
            return;
        }

        const blob = new Blob([data], { type: 'text/json' });

        const a = document.createElement('a');
        a.download = `${fileName}.json`;
        a.href = window.URL.createObjectURL(blob);

        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        a.dispatchEvent(clickEvt);
        a.remove();
    }, [data, fileName]);

    return downloadJson;
};
