import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddBudgetSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(30, 'Name must be at most 30 characters'),
    amount: Yup.number().required('Amount is required').max(999999999, 'Amount must be at most 999999999'),
});

function AddBudget() {
    const initialValues = {
        name: '',
        amount: '',
    };

    const handleAddBudget = async (values) => {
        // Add your logic here to handle adding the budget
        console.log('Adding budget:', values);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={AddBudgetSchema}
                onSubmit={handleAddBudget}
            >
                {() => (
                    <Form>
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
                        <button className='classic-btn auth-btn' type="submit">
                            Add Budget
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AddBudget;
