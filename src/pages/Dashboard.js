import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../apiSlice';
import './dashboard.css';
import '../animations.css';
import ProfileContainer from '../components/Profile/ProfileContainer';
import BudgetsContainer from '../components/Budgets/BudgetsContainer';
import ExpensesContainer from '../components/Expenses/ExpensesContainer';
import CardContainer from '../components/Card/CardContainer';
import Loading from '../components/Loading';
import { Success } from '../components/Success';

function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isSuccess: isProfile, isError: isProfileError } = useGetUserQuery();

    useEffect(() => {
        if (isProfileError) {
            navigate("/login");
        }
    }, [isProfileError, navigate])


    if (isProfile) {
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


}

export default Dashboard