/**
 * @file React routing.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { FC, LazyExoticComponent } from 'react';
import { Path } from './Paths';

/**
 * Route model.
 */
export type RouteModel = {
    path: Path
    Component: LazyExoticComponent<FC>
};
