import React, { useState } from 'react'
import './budgetsContainer.css';
import BudgetBar from './BudgetBar';
import { useBudgetsQuery, useExpensesQuery } from '../../apiSlice';
import AddBudget from '../Forms/AddBudget';
import Loading from '../Loading';

function BudgetsContainer() {
    const { data: budgets, isFetching: isBudgetsFetching } = useBudgetsQuery();
    const { data: expenses, isFetching: isExpensesFetching } = useExpensesQuery();

    const [showAddBudget, setshowAddBudget] = useState(false);

    const handleAddBudget = (expense) => {
        setshowAddBudget(expense);
    };

    if (isBudgetsFetching || isExpensesFetching) {
        return (
            <div className='budgets-container'>
                <div className='section-header-container'>
                    <p className='section-heading'>Budgets</p>
                    <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                </div>
                <Loading />
            </div>
        )
    }

    if (budgets) {
        const totalExpensesByBudget = {};
        if (expenses) {
            expenses.forEach(expense => {
                const budgetId = expense.budgetId;
                const amount = expense.amount;

                if (totalExpensesByBudget.hasOwnProperty(budgetId)) {
                    totalExpensesByBudget[budgetId] += amount;
                } else {
                    totalExpensesByBudget[budgetId] = amount;
                }
            });
        }
        var budgetsData = {};
        for (const budget of budgets) {
            const budgetId = budget._id;
            const totalExpenses = totalExpensesByBudget[budgetId] || 0;
            budgetsData[budget.name] = totalExpenses;
        }
        if (budgets.length === 0) {
            return (
                showAddBudget ?
                    <div className='modal'>
                        <div className='form-wrapper'>
                            <AddBudget handleAddBudget={handleAddBudget} /> <button className='close-btn' onClick={() => setshowAddBudget(false)}>x</button>
                        </div>
                    </div>
                    :
                    <div className='budgets-container'>
                        <div className='section-header-container'>
                            <p className='section-heading'>Budgets</p>
                            <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                        </div>
                        <p className='section-heading'>No Budgets to show!</p>
                    </div>
            )
        }
        let Budgets;
        if (budgets && Array.isArray(budgets) && !budgets.error) {
            if (budgets.length > 5) {
                Budgets = budgets.slice(0, 5);
            }

            else {
                Budgets = budgets;
            }

        }
        return (
            showAddBudget ?
                <div className='modal'>
                    <div className='form-wrapper'>
                        <AddBudget handleAddBudget={handleAddBudget} /> <button className='close-btn' onClick={() => setshowAddBudget(false)}>x</button>
                    </div>
                </div>
                :
                <div className='budgets-container'>
                    <div className='section-header-container'>
                        <p className='section-heading'>Budgets</p>
                        <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                    </div>
                    {
                        Budgets.map((budget, index) => (
                            <BudgetBar total={budget.amount} score={budgetsData[budget.name]} name={budget.name} id={budget._id} key={index} />
                        ))
                    }

                </div>
        )
    }

}

export default BudgetsContainer