import React, { useEffect, useState } from 'react';
import './cardContainer.css';
import Card from './Card';
import Loading from '../Loading';
import TodayExpenses from '../../icons/save-money.png';
import RecentExpense from '../../icons/spending-money.png';
import ActiveBudget from '../../icons/budgeting.png';
import BudgetsFull from '../../icons/no-money.png';

import { useExpensesQuery, useBudgetsQuery } from '../../apiSlice';


const getObjectsWithTodayDate = (data) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const filteredObjects = data.filter((object) => {
        const objectDate = new Date(object.date);
        const objectYear = objectDate.getFullYear();
        const objectMonth = objectDate.getMonth() + 1;
        const objectDay = objectDate.getDate();
        return objectYear === year && objectMonth === month && objectDay === day;
    });
    return filteredObjects;
};


function CardContainer() {
    const { data: budgets, isError: isBudgetsError, isFetching: isBudgetsFetching } = useBudgetsQuery();
    const { data: expenses, isSuccess: isExpenses, isError: isExpensesError, isFetching: isExpensesFetching } = useExpensesQuery();

    const [todayObjects, setTodayObjects] = useState([]);
    const [lastObject, setlastObject] = useState([]);

    useEffect(() => {
        if (isExpenses && expenses) {
            if (expenses.length > 0) {
                const filteredObjects = getObjectsWithTodayDate(expenses);
                if (filteredObjects.length !== 0) {
                    setlastObject(filteredObjects[filteredObjects.length - 1]);
                    setTodayObjects(filteredObjects);
                }
                else {
                    setlastObject(expenses[expenses.length - 1]);
                }
            }
            else {
                setlastObject({});
                setTodayObjects([]);
            }
        }
    }, []);

    if (isBudgetsFetching || isExpensesFetching) {
        return (
            <div className='card-container'>
                <div className='card'>
                    <img src={TodayExpenses} alt="icon" />
                    <div style={{ height: '100px' }}>
                        <Loading />
                    </div>
                </div>
                <div className='card'>
                    <img src={RecentExpense} alt="icon" />
                    <div style={{ height: '100px' }}>
                        <Loading />
                    </div>
                </div>
                <div className='card'>
                    <img src={BudgetsFull} alt="icon" />
                    <div style={{ height: '100px' }}>
                        <Loading />
                    </div>
                </div>
                <div className='card'>
                    <img src={ActiveBudget} alt="icon" />
                    <div style={{ height: '100px' }}>
                        <Loading />
                    </div>
                </div>
            </div>
        )
    }

    if (isBudgetsError || isExpensesError) {
        return <div>Error: Data could not be fetched</div>;
    }

    if (budgets) {
        const totalExpensesByBudget = {};
        expenses.forEach(expense => {
            const budgetId = expense.budgetId;
            const amount = expense.amount;

            if (totalExpensesByBudget.hasOwnProperty(budgetId)) {
                totalExpensesByBudget[budgetId] += amount;
            } else {
                totalExpensesByBudget[budgetId] = amount;
            }
        });
        var exceededBudgets = 0;
        var budgetsData = [];
        for (const budget of budgets) {
            const budgetId = budget._id;
            const totalExpenses = totalExpensesByBudget[budgetId] || 0;
            budgetsData.push({ 'name': budget.name, 'totalExpenses': totalExpenses });
            if (totalExpenses === budget.amount) {
                exceededBudgets++;
            }
        }
    }
    return (
        <div className='card-container'>
            <Card number={todayObjects.length} title={"Expenses made today"} icon={TodayExpenses} />
            <Card number={lastObject.amount ? `${lastObject.amount}Rs` : `${0}rs`} description={lastObject ? lastObject.description : ""} title={"Last Expense"} icon={RecentExpense} />
            <Card number={exceededBudgets} title={"Budgets are Full"} icon={BudgetsFull} />
            <Card number={!budgets.error ? budgets.length : 0} title={"Active Budgets"} icon={ActiveBudget} />
        </div>
    )
}

export default CardContainer