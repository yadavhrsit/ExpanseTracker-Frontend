import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BASE_URL = 'http://localhost:8000';

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/utils/isemailavail/${email}`);
        return response.data.available;
    } catch (error) {
        console.error('Error checking email availability:', error);
        return false;
    }
}

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(50, 'Name must be at most 50 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format').max(50, 'Email must be at most 50 characters')
        .test('email-available', 'Email is already registered', async function (value) {
            if (value) {
                const isEmailAvailable = await checkEmailAvailability(value);
                return isEmailAvailable;
            }
            return true;
        }),
    password: Yup.string().required('Password is required').max(20, 'Password must be at most 20 characters'),
});

const Signup = () => {
    const [response, setResponse] = useState(null);

    return (
        <div>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        console.log(values)
                        const response = await axios.post(`${BASE_URL}/auth/register`, {
                            name: values.name,
                            email: values.email,
                            password: values.password,
                        });
                        setResponse(response.data);
                    } catch (error) {
                        setResponse(response.data);
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
                        <a href="/login">Already a Registered user ? <strong>Login</strong></a>
                        {response ? <div>{response.message}</div> : ""}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;
