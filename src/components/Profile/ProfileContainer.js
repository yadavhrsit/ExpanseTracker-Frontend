import React from 'react'
import './profileContainer.css';
var S = require('string');
function ProfileContainer(props) {
    return (
        <div className="profile-container">
            <img src="https://dummyimage.com/200.png?text=Profile%20Icon" alt="Profile" />
            <div className="profile-text-container">
                <p className='profile-welcome-text'>Welcome!</p>
                <p className='profile-name-text'>{S(props.name).titleCase().s}</p>
            </div>
            <button className='classic-btn'>+ Add Expense</button>
        </div>
    )
}

export default ProfileContainer