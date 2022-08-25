import { ReactElement } from 'react';

export const Logo = (): ReactElement => {
    return (
        <a
            rel="noreferrer"
            target="_blank"
            href="https://nil.foundation"
        >
            <ol className="navbar-brand breadcrumb">
                <li>
                    <code>
                        =nil;
                    </code>
                    Foundation
                </li>
            </ol>
        </a>
    );
}
