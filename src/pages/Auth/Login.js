import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useGetUserQuery } from '../../apiSlice';
import Loading from '../../components/Loading';

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format').max(50, 'Email must be at most 50 characters'),
    password: Yup.string().required('Password is required').max(20, 'Password must be at most 20 characters'),
});

const Login = () => {
    let navigate = useNavigate();
    const { isLoading, isSuccess } = useGetUserQuery();

    if (isSuccess) {
        navigate('/');
    }


    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [login] = useLoginMutation();

    const handleLogin = async (values) => {
        setIsLoggingIn(true);
        try {
            await login(values).unwrap()
                .then((payload) => {
                    setTimeout(() => {
                        setIsLoggingIn(false);
                        navigate('/');
                    }, 500);

                })
                .catch((error) => {
                    setIsLoggingIn(false);
                });

        } catch (error) {
            alert('Login error:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <>
            {
                isLoading ? <div className="modal"> <Loading /> </div> : null
            }
            {
                isLoggingIn ? <div className="modal"> <Loading /> </div> : null
            }
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {() => (
                    <Form>
                        <p className='section-heading'>Login</p>
                        <div className='field-container'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className='field-container'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <button className='classic-btn auth-btn' type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Logging In...' : 'Submit'}
                        </button>
                        <a href="/register">Not a Registered user ? <strong>Signup</strong></a>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Login;
