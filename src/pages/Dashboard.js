import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../apiSlice';




function Dashboard() {
    let navigate = useNavigate();
    const { data: profile, isLoading, isSuccess, isError } = useGetUserQuery();
    if (isSuccess) {
        return (
            <div>Dashboard
                <pre>
                    User is : {profile.userName}
                </pre>
            </div>
        )
    }
    if (isError) {
        navigate("/login");
    }


}

export default Dashboard