import React, { useState } from 'react';
import './profileContainer.css';
import { useLogoutMutation } from '../../apiSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
var S = require('string');

function ProfileContainer(props) {
    const navigate = useNavigate();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [logout] = useLogoutMutation();
    async function Logout() {
        setIsLoggingOut(true);
        try {
            await logout().unwrap();
            setTimeout(() => {
                setIsLoggingOut(false);
                navigate('/login');
            }, 500);
        } catch (error) {
            setIsLoggingOut(false);
        }
    }


    return (
        <>
            {

                isLoggingOut ? <div className='modal'><Loading /> </div> : null

            }
            <div className="profile-container">
                <img src="https://dummyimage.com/200.png?text=Profile%20Icon" alt="Profile" />
                <div className="profile-text-container">
                    <p className='profile-welcome-text'>Welcome!</p>
                    <p className='profile-name-text'>{S(props.name).titleCase().s}</p>
                </div>
                <button className='classic-btn' onClick={Logout}>Logout</button>
            </div>
        </>
    )
}

export default ProfileContainer;
