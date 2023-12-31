import React, { useState } from 'react'
import ExpenseBar from './ExpenseBar'
import './expensesContainer.css';
import { useExpensesQuery, useBudgetsQuery } from '../../apiSlice';
import AddExpense from '../Forms/AddExpense';
import Loading from '../Loading';

function ExpensesContainer() {
    const { data: budgets, isSuccess: isBudgets } = useBudgetsQuery();
    const { data: expenses, isSuccess: isExpenses, isLoading } = useExpensesQuery();
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
                            <button className='close-btn-exp' onClick={() => setshowAddExpense(false)} >x</button>
                        </div>
                    </div>
                    :
                    <div className='expenses-container'>
                        <div className='section-header-container' id='expenses-container-header'>
                            <p className="section-heading">Expenses</p>
                            <button className='classic-btn' onClick={() => setshowAddExpense(true)} disabled={isBudgets && budgets.length === 0}>+ Add Expense</button>
                        </div>
                        <p className="section-heading">No Expenses to show yet!</p>
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
                        {/* <table className="expense-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Options</th>
                                </tr>
                            </thead> */}
                        {
                            Expenses.slice().reverse().map((expense, index) => (

                                <ExpenseBar description={expense.description} expenseId={expense._id} date={expense.date} category={expense.category} amount={expense.amount} budgetId={expense.budgetId} key={index} />
                            ))
                        }
                        {/* </table> */}
                    </div>
            )
        }
    }

}
export default ExpensesContainer