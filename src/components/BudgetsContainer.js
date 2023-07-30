import React from 'react'
import './budgetsContainer.css';
import BudgetBar from './BudgetBar';
function BudgetsContainer() {
    return (
        <div className='budgets-container'>
            <div className='section-header-container'>
                <p className='section-heading'>Budgets</p>
                <button className='classic-btn'>+ Add Budget</button>
            </div>
            <BudgetBar total={100} score={50} name="Budget 1" key={1} />
            <BudgetBar total={4000} score={400} name={"Groceries"} key={2} />
            <BudgetBar total={6000} score={200} name={"Snacks"} key={3} />
            <BudgetBar total={6000} score={900} name={"Travel"} key={4} />
            <BudgetBar total={20000} score={900} name={"Rent"} key={5} />
            <BudgetBar total={5000} score={5000} name={"Bills"} key={6} />
            <BudgetBar total={3000} score={900} name={"Misc"} key={7} />
            <button className='classic-btn'>View All</button>
        </div>
    )
}

export default BudgetsContainer