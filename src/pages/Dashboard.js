import React, { } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../apiSlice';
import './dashboard.css';
import '../animations.css';
import ProfileContainer from '../components/Profile/ProfileContainer';
import BudgetsContainer from '../components/Budgets/BudgetsContainer';
import ExpensesContainer from '../components/Expenses/ExpensesContainer';
import CardContainer from '../components/Card/CardContainer';


function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isSuccess, isError } = useGetUserQuery();
    console.log(profile)
    if (isSuccess) {
        return (
            <div className='dashboard-page'>
                <ProfileContainer name={profile.userName} />
                <div className='grid'>
                    <BudgetsContainer />
                    <ExpensesContainer />
                </div>
                <CardContainer />
            </div>
        )
    }
    if (isError) {
        navigate("/login");
    }


}

export default Dashboard