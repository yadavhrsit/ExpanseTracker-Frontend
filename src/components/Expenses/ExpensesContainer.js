import React from 'react'
import ExpenseBar from './ExpenseBar'
import './expensesContainer.css';
function ExpensesContainer() {
    return (
        <div className='expenses-container'>
            <div className='section-header-container' id='expenses-container-header'>
                <p className="section-heading">Expenses</p>
                <button className='classic-btn'>+ Add Expense</button>
            </div>
            <ExpenseBar title={"Rice"} date={"22/7/23"} category={"Grocery"} amount={320} />
            <ExpenseBar title={"Wifi"} date={"22/7/23"} category={"Bills"} amount={1000} />
            <ExpenseBar title={"Uber"} date={"22/7/23"} category={"Travel"} amount={350} />
            <ExpenseBar title={"Rice"} date={"22/7/23"} category={"Grocery"} amount={320} />
            <button className='classic-btn view-button'>View All</button>
        </div>
    )
}

export default ExpensesContainer