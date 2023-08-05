import React, { useState } from 'react';
import './expensebar.css';
import { useDeleteExpenseMutation } from '../../apiSlice';
import UpdateExpense from '../Forms/UpdateExpense';

function ExpenseBar({ description, date, category, amount, expenseId, budgetId }) {
    const [showUpdateExpense, setshowUpdateExpense] = useState(false);
    const [deleteExpense, { isLoading, isSuccess }] = useDeleteExpenseMutation();

    const handleUpdateExpense = (expense) => {
        setshowUpdateExpense(expense)
    };

    const handleDeleteClick = async () => {
        try {
            const deleteExpenseData = { expenseId };
            await deleteExpense(deleteExpenseData).unwrap().then((payload) => {
                console.log(payload);
            }).catch((err) => {
                console.log('Error:', err);
            })
        } catch (error) {
            console.log("Failed to Delete Expense", error);
        }
    };

    const formatDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(formatDate);


    return (
        showUpdateExpense ?
            <div className='modal'>
                <UpdateExpense handleUpdateExpense={handleUpdateExpense} expenseId={expenseId} description={description} budgetId={budgetId} amount={amount} category={category} />
                <button className='close-btn' onClick={() => setshowUpdateExpense(false)}>x</button>
            </div> :
            <div className='expensebar-container'>
                <img src="https://dummyimage.com/60.png" alt="expense" className='expense-img' />
                <div className="expense-data-container-left">
                    <p className="expense-title">{description}</p>
                    <p className="expense-category">{category}</p>
                </div>
                <div className="expense-data-container-right">
                    <p className="expense-date">{formattedDate}</p>
                    <p className="expense-amount">{amount} Rs</p>
                </div>
                <div className="options-window col">
                    <button onClick={handleUpdateExpense}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
    )
}

export default ExpenseBar