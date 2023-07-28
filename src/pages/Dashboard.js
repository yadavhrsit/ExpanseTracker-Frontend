import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../apiSlice';
import FluidCard from '../components/FluidCard';
import SectionContainer from '../components/SectionContainer';




function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isLoading, isSuccess, isError } = useGetUserQuery();
    if (isSuccess) {
        return (
            <div>Dashboard
                <pre>
                    Hello : {profile.userName}
                </pre>
                <FluidCard />
                <SectionContainer />
            </div>
        )
    }
    if (isError) {
        navigate("/login");
    }


}

export default Dashboard