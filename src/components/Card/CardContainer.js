import React, { useEffect, useState } from 'react';
import './cardContainer.css';
import Card from './Card';
import { useExpensesQuery, useBudgetsQuery } from '../../apiSlice';

const getObjectsWithTodayDate = (data) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so added 1
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
    const { data: budgets, isSuccess: isBudgets, isError: isBudgetsError, isFetching: isBudgetsFetching } = useBudgetsQuery();
    const { data: expenses, isSuccess: isExpenses, isError: isExpensesError, isFetching: isExpensesFetching } = useExpensesQuery();

    const [todayObjects, setTodayObjects] = useState([]);
    const [lastObject, setlastObject] = useState([]);

    useEffect(() => {
        if (isExpenses && expenses) {
            const filteredObjects = getObjectsWithTodayDate(expenses);
            setlastObject(filteredObjects[filteredObjects.length - 1]);
            setTodayObjects(filteredObjects);
        }
    }, [isExpenses, expenses]);

    if (isBudgetsFetching || isExpensesFetching) {
        return <div>Loading...</div>;
    }

    if (isBudgetsError || isExpensesError) {
        return <div>Error: Data could not be fetched</div>;
    }

    console.log(lastObject)

    return (
        <div className='card-container flip-in-diag-1-tr'>
            <Card number={todayObjects.length} title={"Expenses made today"} />
            <Card number={`${lastObject.amount} Rs`} description={lastObject.description} title={"Last Expense"} />
        </div>
    )
}

export default CardContainer