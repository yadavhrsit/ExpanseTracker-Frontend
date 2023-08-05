import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUpdateBudgetMutation } from '../../apiSlice';
import { Success } from '../Success';
import Loading from '../Loading';

const UpdateBudgetSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    amount: Yup.number().required('Amount is required').max(999999999, 'Amount must be at most 999999999'),
});

function UpdateBudget({ handleUpdateBudget, id, name }) {
    const initialValues = {
        name: name,
        id: id,
        amount: '',
    };
    const [updateBudget, { isLoading, isSuccess }] = useUpdateBudgetMutation();

    const handleFormSubmit = async (values) => {
        try {
            delete values.name;
            await updateBudget(values).unwrap().then((payload) => {
                console.log(payload);
                setTimeout(() => {
                    handleUpdateBudget(false);
                }, 1100);
            }).catch((err) => {
                alert("Error Occured Try again later");
                console.log(err);
            })
        } catch {
            alert('Failed to Update budget:');
        }
    };


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={UpdateBudgetSchema}
                onSubmit={handleFormSubmit}
            >
                {() => (
                    <Form>
                        {isSuccess ?
                            <Success /> :
                            isLoading ? <Loading /> :
                                <>
                                    <div className='field-container'>
                                        <label htmlFor="name">Updating Budget for</label>
                                        <Field type="text" id="name" name="budget" value={name} disabled={true} />
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </div>
                                    <div className='field-container'>
                                        <label htmlFor="amount">Amount</label>
                                        <Field type="number" id="amount" name="amount" />
                                        <ErrorMessage name="amount" component="div" className="error" />
                                    </div>
                                    <button className='classic-btn auth-btn' type="submit" disabled={isLoading}>
                                        {isLoading ? 'Updating...' : 'Update Budget Amount'}
                                    </button>
                                </>
                        }
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default UpdateBudget;
