import React from 'react'
import ExpenseBar from './ExpenseBar'
import './expensesContainer.css';
function ExpensesContainer() {
    return (
        <div className='expenses-container'>
            <ExpenseBar title={"Rice"} date={"22/7/23"} category={"Grocery"} amount={320} />
            <ExpenseBar title={"Wifi"} date={"22/7/23"} category={"Bills"} amount={1000} />
            <ExpenseBar title={"Uber"} date={"22/7/23"} category={"Travel"} amount={350} />
        </div>
    )
}

export default ExpensesContainer