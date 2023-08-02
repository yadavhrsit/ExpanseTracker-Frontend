import React from 'react'
import ExpenseBar from './ExpenseBar'
import './expensesContainer.css';
import { useExpensesQuery } from '../../apiSlice';
function ExpensesContainer() {
    const { data: expenses, isSuccess: isExpenses, isError: isExpensesError, isFetching } = useExpensesQuery();

    if (isFetching) {
        return (
            <div className='expenses-container'>
                <div className='section-header-container' id='expenses-container-header'>
                    <p className="section-heading">Expenses</p>
                    <button className='classic-btn'>+ Add Expense</button>
                </div>
                <p className="section-heading">Loading Expenses!</p>
            </div>
        )
    }
    else if (isExpenses) {
        let Expenses;
        if (expenses && Array.isArray(expenses)) {
            if (expenses.length > 5) {
                Expenses = expenses.slice(0, 5);
            }
            else if (expenses.length === 0) {
                return (
                    <div className='expenses-container'>
                        <div className='section-header-container' id='expenses-container-header'>
                            <p className="section-heading">Expenses</p>
                            <button className='classic-btn'>+ Add Expense</button>
                        </div>
                        <p className="section-heading">No Expenses to show yet!</p>
                        <button className='classic-btn view-button'>View All</button>
                    </div>
                )
            }
            else {
                Expenses = expenses;
            }
            return (
                <div className='expenses-container'>
                    <div className='section-header-container' id='expenses-container-header'>
                        <p className="section-heading">Expenses</p>
                        <button className='classic-btn'>+ Add Expense</button>
                    </div>
                    {
                        Expenses.map((expense, index) => (
                            <ExpenseBar title={expense.description} date={expense.date} category={expense.category} amount={expense.amount} key={index} />
                        ))
                    }
                    <button className='classic-btn view-button'>View All</button>
                </div>
            )

        }
    }
    else if (isExpensesError) {
        return (
            <div className='expenses-container'>
                <div className='section-header-container' id='expenses-container-header'>
                    <p className="section-heading">Expenses</p>
                    <button className='classic-btn'>+ Add Expense</button>
                </div>
                <p className="section-heading">Error Loading Expenses... Server Error!</p>
            </div>
        )
    }



}

export default ExpensesContainer