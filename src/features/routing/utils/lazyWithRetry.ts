/**
 * @file Lazy load component with page reload on error.
 * It helps to avoid the situation when the user is stuck on the page with a broken chunk.
 */

import { lazy } from 'react';
import { SessionStorageAPI } from '@/packages/SessionStorage';

type ComponentImportType = () => Promise<{ default: React.ComponentType }>;

const sessionKey = 'lazyWithRetry';

/**
 * Lazy load component with page reload on error.
 *
 * @param componentImport - Function that returns a promise with a component.
 * @param name - Name of the component.
 * @returns - Lazy loaded component.
 */
const lazyWithRetry = (componentImport: ComponentImportType, name: string) => {
  return lazy(async () => {
    const hasRefreshed = SessionStorageAPI.getItem(`${sessionKey}-${name}`) || 'false';

    try {
      SessionStorageAPI.setItem(`${sessionKey}-${name}`, 'false');
      return await componentImport();
    } catch (error) {
      if (hasRefreshed === 'false') {
        SessionStorageAPI.setItem(`${sessionKey}-${name}`, 'true');
        window.location.reload();
      }

      if (hasRefreshed === 'true') throw new Error('chunkLoadError', error);
    }
    return await componentImport();
  });
};

export default lazyWithRetry;
