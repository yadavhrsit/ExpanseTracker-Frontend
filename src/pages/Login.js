import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useGetUserQuery } from '../apiSlice';

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format').max(50, 'Email must be at most 50 characters'),
    password: Yup.string().required('Password is required').max(20, 'Password must be at most 20 characters'),
});

const Login = () => {
    let navigate = useNavigate();

    const { isLoading, isSuccess } = useGetUserQuery();

    if (isSuccess) {
        navigate("/");
    }
    if (isLoading) {
        console.log("... is Loading")
    }


    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [login] = useLoginMutation();

    const handleLogin = async (values) => {
        setIsLoggingIn(true);
        try {
            await login(values).unwrap()
                .then((payload) => {
                    setIsLoggingIn(false);
                    console.log(payload.message)
                    setTimeout(() => {
                        navigate('/');
                        console.log('redirecting...')
                    }, 500);

                })
                .catch((error) => {
                    setIsLoggingIn(false);
                    console.error(error.data.isError)
                });

        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {() => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <button type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Logging In...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
