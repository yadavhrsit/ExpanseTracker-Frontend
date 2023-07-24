import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'http://localhost:8000';

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format').max(50, 'Email must be at most 50 characters'),
    password: Yup.string().required('Password is required').max(20, 'Password must be at most 20 characters'),
});

const Login = () => {
    const [response, setResponse] = useState(null);

    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                    try {
                        const response = await axios.post(`${BASE_URL}/auth/login`, {
                            email: values.email,
                            password: values.password,
                        });
                        setResponse(response.data);
                    } catch (error) {
                        setResponse({ message: 'Login failed. Please check your email and password.' });
                    }
                }}
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

                        <button type="submit">Submit</button>
                        {response ? <div>{response.message}</div> : ""}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
