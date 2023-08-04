import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddBudgetMutation } from '../../apiSlice';
import { Success } from '../Success';
import Loading from '../Loading';
import { motion } from "framer-motion";

const AddBudgetSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(30, 'Name must be at most 30 characters'),
    amount: Yup.number().required('Amount is required').max(999999999, 'Amount must be at most 999999999'),
});

function AddBudget({ handleAddBudget }) {
    const initialValues = {
        name: '',
        amount: '',
    };

    const [addBudget, { isLoading, isSuccess }] = useAddBudgetMutation();

    const handleFormSubmit = async (values) => {
        try {
            await addBudget(values).unwrap().then((payload) => {
                setTimeout(() => {
                    handleAddBudget(false);
                }, 1100);
            }).catch((err) => {
                if (err.data.err.code === 11000) {
                    alert("Duplicate Budget")
                }
                else
                    alert("Error Occured Try again later");
            })
        } catch {
            alert('Failed to add budget:');
        }
    };


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={AddBudgetSchema}
                onSubmit={handleFormSubmit}
            >
                {() => (
                    <Form>
                        {isSuccess ?
                            <Success /> :
                            isLoading ? <Loading /> :
                                <>
                                    <div className='field-container'>
                                        <label htmlFor="name">Name</label>
                                        <Field type="text" id="name" name="name" />
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </div>
                                    <div className='field-container'>
                                        <label htmlFor="amount">Amount</label>
                                        <Field type="number" id="amount" name="amount" />
                                        <ErrorMessage name="amount" component="div" className="error" />
                                    </div>
                                    <button className='classic-btn auth-btn' type="submit" disabled={isLoading}>
                                        {isLoading ? 'Adding...' : 'Add Budget'}
                                    </button>
                                </>}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AddBudget;
