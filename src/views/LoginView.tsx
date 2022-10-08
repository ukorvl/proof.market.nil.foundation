
/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Row, Col } from '@nilfoundation/react-components';
import { LoginContainer, LoginForm } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <LoginContainer>
        <Row>
            <Col xs={12} sm={4} md={3}>
                <LoginForm />
            </Col>
        </Row>
    </LoginContainer>
);

export default LoginView;
