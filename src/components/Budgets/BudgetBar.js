import React from 'react'
import './budgetsBar.css'
function BudgetBar({ total, score, name }) {
    const percentage = (score / total) * 100;
    const gradientColors = `linear-gradient(90deg, rgba(0,91,255,1) 0%,rgba(0,238,218,1)${percentage}%,#cccccc ${percentage}%)`;
    return (
        <div className='budgetbar-container'>
            <div className="budget-body">
                <p className='budget-caption'>{name}</p><p className='budget-stats'>{score} / {total}</p>
            </div>
            <div className="progress-bar" style={{ backgroundImage: gradientColors }} />
        </div>
    )
}

export default BudgetBar