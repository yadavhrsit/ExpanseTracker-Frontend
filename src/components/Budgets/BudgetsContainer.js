import React, { useState } from 'react'
import './budgetsContainer.css';
import BudgetBar from './BudgetBar';
import { useBudgetsQuery } from '../../apiSlice';
import AddBudget from '../Forms/AddBudget';
import Loading from '../Loading';

function BudgetsContainer() {
    const { data: budgets, isSuccess: isBudgets, isError: isBudgetsError, isLoading } = useBudgetsQuery();
    const [showAddBudget, setshowAddBudget] = useState(false);

    const handleAddBudget = (expense) => {
        setshowAddBudget(expense);
    };

    if (isLoading) {
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

    else if (isBudgets) {
        if (budgets.error) {
            return (
                showAddBudget ? <> <div className='modal'> <AddBudget handleAddBudget={handleAddBudget} /> <button className='close-btn' onClick={() => setshowAddBudget(false)}>x</button> </div>
                    <div className='budgets-container'>
                        <div className='section-header-container'>
                            <p className='section-heading'>Budgets</p>
                            <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                        </div>
                        <p className='section-heading'>No Budgets to show! Please add some</p>
                    </div>
                </>
                    :
                    <div className='budgets-container'>
                        <div className='section-header-container'>
                            <p className='section-heading'>Budgets</p>
                            <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                        </div>
                        <p className='section-heading'>No Budgets to show! Please add some</p>
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
            showAddBudget ? <> <div className='modal'> <AddBudget handleAddBudget={handleAddBudget} /> <button className='close-btn' onClick={() => setshowAddBudget(false)}>x</button> </div>
                <div className='budgets-container'>
                    <div className='section-header-container'>
                        <p className='section-heading'>Budgets</p>
                        <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                    </div>
                    {
                        Budgets.map((budget, index) => (
                            <BudgetBar total={budget.amount} score={budget.totalExpenses} name={budget.name} id={budget._id} key={index} />
                        ))

                    }
                    <button className='classic-btn view-button'>View All</button>
                </div>
            </>
                :
                <div className='budgets-container'>
                    <div className='section-header-container'>
                        <p className='section-heading'>Budgets</p>
                        <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                    </div>
                    {
                        Budgets.map((budget, index) => (
                            <BudgetBar total={budget.amount} score={budget.totalExpenses} name={budget.name} id={budget._id} key={index} />
                        ))
                    }
                    <button className='classic-btn view-button'>View All</button>
                </div>
        )
    }
    else if (isBudgetsError) {
        return (
            showAddBudget ? <> <div className='modal'> <AddBudget handleAddBudget={handleAddBudget} /> <button className='close-btn' onClick={() => setshowAddBudget(false)}>x</button> </div>
                <div className='budgets-container'>
                    <div className='section-header-container'>
                        <p className='section-heading'>Budgets</p>
                        <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                    </div>
                    <p>Error Loading Budgets... Server Error!</p>
                </div>
            </>
                :
                <div className='budgets-container'>
                    <div className='section-header-container'>
                        <p className='section-heading'>Budgets</p>
                        <button className='classic-btn' onClick={() => setshowAddBudget(true)}>+ Add Budget</button>
                    </div>
                    <p>Error Loading Budgets... Server Error!</p>
                </div>
        )
    }
}

export default BudgetsContainer