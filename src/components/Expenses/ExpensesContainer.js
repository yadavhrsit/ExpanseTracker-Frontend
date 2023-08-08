import React, { useState } from 'react'
import ExpenseBar from './ExpenseBar'
import './expensesContainer.css';
import { useExpensesQuery } from '../../apiSlice';
import AddExpense from '../Forms/AddExpense';
import Loading from '../Loading';

function ExpensesContainer() {
    const { data: expenses, isSuccess: isExpenses, isError: isExpensesError, isLoading } = useExpensesQuery();
    const [showAddExpense, setshowAddExpense] = useState(false);
    const handleAddExpense = (expense) => {
        setshowAddExpense(expense);
    };

    if (isLoading) {
        return (
            <div className='expenses-container'>
                <div className='section-header-container' id='expenses-container-header'>
                    <p className="section-heading">Expenses</p>
                    <button className='classic-btn' onClick={() => setshowAddExpense(true)}>+ Add Expense</button>
                </div>
                <Loading />
            </div>
        )
    }
    if (isExpenses) {
        let Expenses;
        if (expenses.length === 0)
            return (
                showAddExpense ?
                    <div className='modal'>
                        <div className="form-wrapper"> <AddExpense handleAddExpense={handleAddExpense} />
                            <button className='close-btn-exp' onClick={() => setshowAddExpense(false)}>x</button>
                        </div>
                    </div>
                    :
                    <div className='expenses-container'>
                        <div className='section-header-container' id='expenses-container-header'>
                            <p className="section-heading">Expenses</p>
                            <button className='classic-btn' onClick={() => setshowAddExpense(true)}>+ Add Expense</button>
                        </div>
                        <p className="section-heading">No Expenses to show yet!</p>
                        <button className='classic-btn view-button'>View All</button>
                    </div>
            )
        else if (expenses && Array.isArray(expenses)) {
            if (expenses.length > 5) {
                const UnsortedExpenses = expenses.slice(-5);
                Expenses = [...UnsortedExpenses].reverse();
            }
            else {
                Expenses = expenses;
            }
            return (
                showAddExpense ?
                    <div className='modal'>
                        <div className="form-wrapper"> <AddExpense handleAddExpense={handleAddExpense} />
                            <button className='close-btn-exp' onClick={() => setshowAddExpense(false)}>x</button>
                        </div>
                    </div>
                    :
                    <div className='expenses-container'>
                        <div className='section-header-container' id='expenses-container-header'>
                            <p className="section-heading">Expenses</p>
                            <button className='classic-btn' onClick={() => setshowAddExpense(true)}>+ Add Expense</button>
                        </div>
                        {
                            Expenses.slice().reverse().map((expense, index) => (
                                <ExpenseBar description={expense.description} expenseId={expense._id} date={expense.date} category={expense.category} amount={expense.amount} budgetId={expense.budgetId} key={index} />
                            ))
                        }
                        <button className='classic-btn view-button'>View All</button>
                    </div>
            )
        }
    }
    else if (isExpensesError) {
        return (
            showAddExpense ?
                <div className='modal'>
                    <div className="form-wrapper"> <AddExpense handleAddExpense={handleAddExpense} />
                        <button className='close-btn-exp' onClick={() => setshowAddExpense(false)}>x</button>
                    </div>
                </div>
                :
                <div className='expenses-container'>
                    <div className='section-header-container' id='expenses-container-header'>
                        <p className="section-heading">Expenses</p>
                        <button className='classic-btn' onClick={() => setshowAddExpense(true)}>+ Add Expense</button>
                    </div>
                    <p className="section-heading">Error Loading Expenses... Server Error!</p>
                </div>
        )
    }
}
export default ExpensesContainer