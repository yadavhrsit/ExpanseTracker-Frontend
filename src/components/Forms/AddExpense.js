import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Assume the "budgets" object is defined and contains an array of budget objects
const budgets = [
    { id: 1, name: 'Budget 1' },
    { id: 2, name: 'Budget 2' },
    { id: 3, name: 'Budget 3' },
    // Add more budget objects as needed
];

const AddExpenseSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
    budgetId: Yup.number().required('Selecting a Budget is required').integer('Budget ID must be an integer').positive('Budget ID must be a positive number'),
});

function AddExpense() {
    const initialValues = {
        description: '',
        amount: '',
        budgetId: '',
    };

    const handleAddExpense = async (values) => {

        console.log('Adding expense:', values);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={AddExpenseSchema}
                onSubmit={handleAddExpense}
            >
                {() => (
                    <Form>
                        <div className='field-container'>
                            <label htmlFor="description">Description</label>
                            <Field type="text" id="description" name="description" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>
                        <div className='field-container'>
                            <label htmlFor="amount">Amount</label>
                            <Field type="number" id="amount" name="amount" />
                            <ErrorMessage name="amount" component="div" className="error" />
                        </div>
                        <div className='field-container'>
                            <label htmlFor="budgetId">Budget</label>
                            <Field as="select" id="budgetId" name="budgetId">
                                <option value="">Select a budget</option>
                                {budgets.map((budget) => (
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="budgetId" component="div" className="error" />
                        </div>
                        <button className='classic-btn auth-btn' type="submit">
                            Add Expense
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AddExpense;
