/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect, useRef, useCallback } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { usePageVisibility } from 'react-page-visibility';
import { useDispatch } from 'react-redux';
import { PageIsHidden, PageIsVisible } from 'src/redux';

const stopApiCallsAfterUserLeavesPageTimeout = 2000;

/**
 * Headless component to handle user leaves/returns to page event.
 *
 * @returns .
 */
export const PageVisibilityDetector = (): ReactElement => {
    const isVisible = usePageVisibility();
    const timeoutIdRef = useRef<NodeJS.Timeout>();
    const dispatch = useDispatch();

    const handleUserReturnsToPage = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            return;
        }

        dispatch(PageIsVisible());

        notificationActions?.create({
            title: 'Network warning',
            message: 'You may need to wait before data updates',
            variant: Variant.warning,
        });
    }, [dispatch]);

    const handleUserLeavesPage = useCallback(() => {
        timeoutIdRef.current = setTimeout(() => {
            timeoutIdRef.current = undefined;
            dispatch(PageIsHidden());
        }, stopApiCallsAfterUserLeavesPageTimeout);
    }, [dispatch]);

    useEffect(() => {
        if (isVisible) {
            handleUserReturnsToPage();
            return;
        }

        handleUserLeavesPage();
    }, [isVisible, handleUserLeavesPage, handleUserReturnsToPage, dispatch]);

    return <></>;
};
