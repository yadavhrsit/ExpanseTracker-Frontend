import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = 'http://localhost:8000';
async function Dashboard() {
    let budgets = null;
    try {
        budgets = await axios.get(`${BASE_URL}/budgets/viewall`);

    } catch (error) {
        console.error('Error getting dashboard data:', error);
    }
    return (
        <div>Dashboard
            <p>
                {budgets ? <p>budegts.budegts</p> : ""}
            </p>
        </div>
    )
}

export default Dashboard