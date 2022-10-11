/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import {
    Jumbotron,
    Image,
    InputGroup,
    Icon,
    Input,
    Size,
    Button,
    Variant,
    Form,
    Spinner,
    Transition,
} from '@nilfoundation/react-components';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../../models';
import { login } from '../../../api';
import { useAuth } from '../../../hooks';
import './LoginForm.scss';

/**
 * Password input type.
 */
type PwdInputType = 'password' | 'text';

/**
 * Login form.
 *
 * @returns React component.
 */
export const LoginForm = (): ReactElement => {
    const { processLogin } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [pwdInputType, setPwdInputType] = useState<PwdInputType>('password');
    const pwdInputIconName = pwdInputType === 'password' ? 'fa-eye-slash' : 'fa-eye';
    const switchPwdInputType = () =>
        setPwdInputType(pwdInputType === 'password' ? 'text' : 'password');

    const {
        register,
        formState: { isSubmitting, isValid },
        handleSubmit,
    } = useForm<LoginData>({
        mode: 'onChange',
    });

    const onSubmitLogin = handleSubmit(async (data: LoginData): Promise<void> => {
        setErrorMessage('');
        try {
            const { jwt } = await login(data);
            processLogin(jwt);
        } catch (e) {
            setErrorMessage('Login error');
        }
    });

    return (
        <Jumbotron className="loginForm">
            <Image
                source={`${process.env.PUBLIC_URL}/logo512x384.png`}
                alt="=nil; Foundation logo"
                responsive
                rounded
            />
            <Form onSubmit={undefined}>
                <Form.Group hasError={!isValid}>
                    <Form.Label htmlFor="userName">Username</Form.Label>
                    <InputGroup size={Size.lg}>
                        <InputGroup.Addon>
                            <Icon iconName="fa-solid fa-user" />
                        </InputGroup.Addon>
                        <Input
                            type="text"
                            id="userName"
                            {...register('username', { required: true })}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <InputGroup size={Size.lg}>
                        <InputGroup.Addon>
                            <Icon iconName="fa-solid fa-lock" />
                        </InputGroup.Addon>
                        <Input
                            type={pwdInputType}
                            id="password"
                            autoComplete="off"
                            {...register('password')}
                        />
                        <InputGroup.Buttons>
                            <Button onClick={switchPwdInputType}>
                                <Icon iconName={`fa-solid ${pwdInputIconName}`} />
                            </Button>
                        </InputGroup.Buttons>
                    </InputGroup>
                </Form.Group>
                <Button
                    block
                    variant={Variant.success}
                    size={Size.lg}
                    onClick={onSubmitLogin}
                    disabled={!isValid || isSubmitting}
                >
                    Login
                    {isSubmitting && <Spinner />}
                </Button>
                {errorMessage && (
                    <Transition
                        name="fade"
                        in={!!errorMessage}
                    >
                        <div className="errorMessage">{errorMessage}</div>
                    </Transition>
                )}
            </Form>
        </Jumbotron>
    );
};
