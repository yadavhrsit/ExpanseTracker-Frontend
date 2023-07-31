import React from 'react';
import './expensebar.css';
function ExpenseBar({ title, date, category, amount }) {
    return (
        <div className='expensebar-container'>
            <img src="https://dummyimage.com/60.png" alt="expense" className='expense-img' />
            <div className="expense-data-container-left">
                <p className="expense-title">{title}</p>
                <p className="expense-category">{category}</p>
            </div>
            <div className="expense-data-container-right">
                <p className="expense-date">{date}</p>
                <p className="expense-amount">{amount} Rs</p>
            </div>
        </div>
    )
}

export default ExpenseBar