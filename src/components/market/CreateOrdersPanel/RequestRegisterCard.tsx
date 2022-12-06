/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Button, Size, useBreakpoints, Variant } from '@nilfoundation/react-components';
import { useNavigate } from 'react-router-dom';
import { Path } from 'src/routing';

/**
 * Request register card.
 *
 * @returns React component.
 */
export const RequestRegisterCard = (): ReactElement => {
    const navigate = useNavigate();
    const { lg } = useBreakpoints();

    return (
        <div className="requestRegisterCard">
            <h4>Authorization required to create orders</h4>
            <Button
                variant={Variant.success}
                size={Size.lg}
                onClick={() => navigate(Path.register)}
                block={!lg}
            >
                Request beta-test credentials
            </Button>
        </div>
    );
};
