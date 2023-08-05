import React, { useState } from 'react';
import './budgetsBar.css';
import UpdateBudget from '../Forms/UpdateBudget';
import { useDeleteBudgetMutation } from '../../apiSlice';
import { Success } from '../Success';
import Loading from '../Loading';

function BudgetBar({ total, score, name, id }) {
    const [showUpdateBudget, setshowUpdateBudget] = useState(false);
    const percentage = (score / total) * 100;
    const gradientColors = `linear-gradient(90deg, rgba(0,91,255,1) 0%,rgba(0,238,218,1)${percentage}%,#cccccc ${percentage}%)`;

    const [deleteBudget, { isLoading, isSuccess }] = useDeleteBudgetMutation();

    const handleUpdateBudget = (budget) => {
        setshowUpdateBudget(budget)
    };
    const handleDeleteClick = async () => {
        try {
            const deleteBudgetData = { id };
            await deleteBudget(deleteBudgetData).unwrap().then((payload) => {
                console.log(payload);
            }).catch((err) => {
                console.log('Error:', err);
            })
        } catch (error) {
            console.log("Failed to Delete Budget", error);
        }
    };
    return (
        showUpdateBudget ?
            <div className='modal'>
                <UpdateBudget handleUpdateBudget={handleUpdateBudget} id={id} name={name} />
                <button className='close-btn' onClick={() => setshowUpdateBudget(false)}>x</button>
            </div> :
            <div className='budgetbar-container'>
                <div className="budget-body">
                    <p className='budget-caption'>{name}</p>
                    <div className='budget-options'>
                        <p className='budget-stats'>{score} / {total}</p>
                        <div className="options-window">
                            <button onClick={handleUpdateBudget}>Edit</button>
                            <button onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="progress-bar" style={{ backgroundImage: gradientColors }} />
            </div>
    );
}

export default BudgetBar;
