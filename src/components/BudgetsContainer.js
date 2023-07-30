import React from 'react'
import './budgetsContainer.css';
import BudgetBar from './BudgetBar';
function BudgetsContainer() {

    return (
        <div className='budgets-container'>
            <p className='section-heading'>Budgets</p>
            <BudgetBar total={4000} score={400} name={"Groceries"} />
            <BudgetBar total={6000} score={200} name={"Snacks"} />
            <BudgetBar total={6000} score={900} name={"Travel"} />
            <BudgetBar total={20000} score={900} name={"Rent"} />
            <BudgetBar total={5000} score={900} name={"Bills"} />
            <BudgetBar total={3000} score={900} name={"Misc"} />
        </div>
    )
}

export default BudgetsContainer