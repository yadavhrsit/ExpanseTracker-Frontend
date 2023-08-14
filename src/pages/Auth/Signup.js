import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useIsEmailAvailableMutation } from '../../apiSlice';
import Loading from '../../components/Loading';
import * as Yup from 'yup';


const Signup = () => {
    let navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [response, setResponse] = useState(null);

    const [register] = useRegisterMutation();

    const [isEmailAvailable] = useIsEmailAvailableMutation();

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').max(50, 'Name must be at most 50 characters'),
        email: Yup.string().required('Email is required').email('Invalid email format').max(50, 'Email must be at most 50 characters')
            .test('email-available', 'Email is already registered', async function (value) {
                if (value) {
                    try {
                        const payload = await isEmailAvailable(value).unwrap();
                        return payload.available;
                    } catch (error) {
                        return false;
                    }
                }
            }),
        password: Yup.string().required('Password is required').max(20, 'Password must be at most 20 characters'),
    });

    return (
        <div>
            {
                isLoggingIn ? <div className="modal"> <Loading /> </div> : null
            }
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    setIsLoggingIn(true);
                    try {
                        await register(values).unwrap()
                            .then((payload) => {
                                setIsLoggingIn(false);
                                setResponse(payload);
                                setTimeout(() => {
                                    navigate('/');
                                }, 500);
                            })
                            .catch((error) => {
                                setTimeout(() => {
                                    setIsLoggingIn(false);
                                }, 600);
                                setResponse(error);
                            })

                    } catch (error) {
                        setTimeout(() => {
                            setIsLoggingIn(false);
                        }, 600);
                        setResponse(error.error);
                    }
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <p className='section-heading'>Signup</p>
                        <div className='field-container'>
                            <label htmlFor="name">Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => {
                                    const name = e.target.value;
                                    const titleCaseName = name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                                    setFieldValue('name', titleCaseName);
                                }}
                            />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
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
                        <button className='classic-btn auth-btn' type="submit">Submit</button>
                        <a href="/">Already a Registered user ? <strong>Login</strong></a>
                        {response ? <div>{response.message}</div> : ""}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;
