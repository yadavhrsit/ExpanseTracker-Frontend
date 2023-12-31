import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUpdateExpenseMutation, useBudgetsQuery } from '../../apiSlice';
import { Success } from '../Success';
import Loading from '../Loading';

const UpdateExpenseSchema = Yup.object().shape({
    id: Yup.string().optional('Id is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
    budgetId: Yup.string().required('Selecting a Budget is required'),
});

function UpdateExpense({ handleUpdateExpense, expenseId, budgetId, category, amount, description }) {

    const initialValues = {
        amount: amount,
        description: description,
        expenseId: expenseId,
        budgetId: budgetId,
    };
    const [updateExpense, { isLoading, isSuccess }] = useUpdateExpenseMutation();
    const { data: budgets, isSuccess: isBudgets } = useBudgetsQuery();

    const [error, seterror] = useState(null)

    const handleFormSubmit = async (values) => {
        try {
            await updateExpense(values).unwrap().then((payload) => {
                setTimeout(() => {
                    handleUpdateExpense(false);
                }, 1100);
            }).catch((err) => {
                seterror(err.data.error);
            })
        } catch {
            alert('Failed to Update Expense:');
        }
    };



    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
            >
                {() => (
                    <Form>
                        {isSuccess ?
                            <Success /> :
                            isLoading ? <Loading /> :
                                <>
                                    <div className='field-container'>
                                        <label htmlFor="description">Updating this Expense</label>
                                        <Field type="text" id="description" name="description" />
                                        <ErrorMessage name="description" component="div" className="error" />
                                    </div>
                                    <div className='field-container'>
                                        <label htmlFor="budgetId">Budget</label>
                                        <Field as="select" id="budgetId" name="budgetId">
                                            <option key={budgetId} value={budgetId}></option>
                                            {!budgets.error && isBudgets ? budgets.map((budget) => (
                                                <option key={budget._id} value={budget._id}>
                                                    {budget.name}
                                                </option>
                                            )) : null}
                                        </Field>
                                        <ErrorMessage name="budgetId" component="div" className="error" />
                                    </div>
                                    <div className='field-container'>
                                        <label htmlFor="amount">Amount</label>
                                        <Field type="number" id="amount" name="amount" />
                                        <ErrorMessage name="amount" component="div" className="error" />
                                    </div>
                                    {error ? <p>{error}</p> : null}
                                    <button className='classic-btn' type="submit" disabled={isLoading}>
                                        {isLoading ? 'Updating...' : 'Update Expense'}
                                    </button>
                                </>
                        }
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default UpdateExpense;