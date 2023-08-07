import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useBudgetsQuery, useAddExpenseMutation } from '../../apiSlice';
import { Success } from '../Success';
import Loading from '../Loading';
import titleCase from '../../TitleCase';

const AddExpenseSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
    budgetId: Yup.string().required('Selecting a Budget is required'),
});

function AddExpense({ handleAddExpense }) {
    const { data: budgets, isSuccess: isBudgets } = useBudgetsQuery();
    const initialValues = {
        description: '',
        amount: '',
        budgetId: '',
    };

    const [addExpense, { isLoading, isSuccess }] = useAddExpenseMutation();

    const handleFormSubmit = async (values) => {
        try {
            values.description = await titleCase(values.description);
            await addExpense(values).unwrap().then((payload) => {
                setTimeout(() => {
                    handleAddExpense(false);
                }, 1100);
            }).catch((err) => {
                console.log(err.data.error);
            });
        } catch {
            alert('Failed to add budget:');
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={AddExpenseSchema}
                onSubmit={handleFormSubmit}
            >
                {() => (
                    <Form>
                        {isSuccess ?
                            <Success /> :
                            isLoading ? <Loading /> :
                                <>
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
                                            {!budgets.error && isBudgets ? budgets.map((budget) => (
                                                <option key={budget._id} value={budget._id}>
                                                    {budget.name}
                                                </option>
                                            )) : null}
                                        </Field>
                                        <ErrorMessage name="budgetId" component="div" className="error" />
                                    </div>
                                    <button className='classic-btn auth-btn' type="submit" disabled={isLoading}>
                                        {isLoading ? 'Adding...' : 'Add Expense'}
                                    </button>
                                </>}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default AddExpense;
