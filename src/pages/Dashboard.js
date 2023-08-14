import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useBudgetsQuery, useExpensesQuery } from '../apiSlice';
import './dashboard.css';
import '../animations.css';
import ProfileContainer from '../components/Profile/ProfileContainer';
import BudgetsContainer from '../components/Budgets/BudgetsContainer';
import ExpensesContainer from '../components/Expenses/ExpensesContainer';
import CardContainer from '../components/Card/CardContainer';
import Loading from '../components/Loading';


function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isSuccess: isProfile, isError: isProfileError } = useGetUserQuery();
    const { isLoading: isBudgets, } = useBudgetsQuery();
    const { isLoading: isExpenses, } = useExpensesQuery();

    useEffect(() => {
        if (isProfileError) {
            navigate("/");
        }
    }, [isProfileError, navigate])


    if (isProfile) {
        return (
            <>
                {isBudgets || isExpenses ? <div className="modal"><Loading /></div> : null}
                <div className='dashboard-page'>
                    <ProfileContainer name={profile.userName} />
                    <CardContainer />
                    <div className='grid'>
                        <BudgetsContainer />
                        <ExpensesContainer />
                    </div>
                </div>
            </>
        )
    }


}

export default Dashboard