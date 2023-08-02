import React from 'react'
import './budgetsContainer.css';
import BudgetBar from './BudgetBar';
import { useBudgetsQuery } from '../../apiSlice';
function BudgetsContainer() {

    const { data: budgets, isSuccess: isBudgets, isError: isBudgetsError, isFetching } = useBudgetsQuery();

    if (isFetching) {
        return (
            <div className='budgets-container'>
                <div className='section-header-container'>
                    <p className='section-heading'>Budgets</p>
                    <button className='classic-btn'>+ Add Budget</button>
                </div>
                <p className="section-heading">Loading Budgets!</p>
            </div>
        )
    }

    else if (isBudgets) {
        let Budgets;
        if (budgets && Array.isArray(budgets)) {
            if (budgets.length > 5) {
                Budgets = budgets.slice(0, 5);
            }
            else if (budgets.length === 0) {
                return (
                    <div className='budgets-container'>
                        <div className='section-header-container'>
                            <p className='section-heading'>Budgets</p>
                            <button className='classic-btn'>+ Add Budget</button>
                            <p>No Budgets to show! Please add some</p>
                        </div>
                    </div>
                )
            }
            else {
                Budgets = budgets;
            }
        }
        return (
            <div className='budgets-container'>
                <div className='section-header-container'>
                    <p className='section-heading'>Budgets</p>
                    <button className='classic-btn'>+ Add Budget</button>
                </div>
                {
                    Budgets.map((budget, index) => (
                        <BudgetBar total={budget.amount} score={budget.totalExpenses} name={budget.name} key={index} />
                    ))
                }
                <button className='classic-btn view-button'>View All</button>
            </div>
        )
    }
    else if (isBudgetsError) {
        return (
            <div className='budgets-container'>
                <div className='section-header-container'>
                    <p className='section-heading'>Budgets</p>
                    <button className='classic-btn'>+ Add Budget</button>
                    <p>Error Loading Budgets... Server Error!</p>
                </div>
            </div>
        )
    }
}

export default BudgetsContainer