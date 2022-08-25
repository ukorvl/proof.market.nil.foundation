/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, ReactNode } from 'react';
import { PageContainer } from '../PageContainer';
import './Layout.scss';

/**
 * Props.
 */
type LayoutProps = {
    children: ReactNode;
    sidebar?: ReactNode;
    navbar?: ReactNode;
    footer?: ReactNode;
};

/**
 * Layout component.
 *
 * @param {LayoutProps} props - Props.
 * @returns React component.
 */
export const Layout = ({children, sidebar, navbar, footer}: LayoutProps): ReactElement =>
    <PageContainer>
        <div className="layout">
            <div className="layout__navbar">
                { navbar && navbar }
            </div>
            <div className="layout__body">
                { sidebar && sidebar }
                {children}
            </div>
            <div className="layout__footer">
                {footer && footer}
            </div>
        </div>
    </PageContainer>;
