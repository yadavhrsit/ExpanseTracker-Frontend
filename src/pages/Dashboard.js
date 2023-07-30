import React, { } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../apiSlice';
import './dashboard.css';
import ProfileContainer from '../components/ProfileContainer';
import BudgetsContainer from '../components/BudgetsContainer';
import ExpensesContainer from '../components/ExpensesContainer';




function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isLoading, isSuccess, isError } = useGetUserQuery();
    console.log(profile)
    if (isSuccess) {
        return (
            <div>
                <ProfileContainer name={profile.userName} />
                <BudgetsContainer />
                <ExpensesContainer />
            </div>
        )
    }
    if (isError) {
        navigate("/login");
    }


}

export default Dashboard