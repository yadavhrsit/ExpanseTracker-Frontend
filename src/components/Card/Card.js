import React from 'react'
import './card.css';
function Card() {
    return (
        <div className='card'>
            <img src="http://fakeimg.pl/60?font=museo" alt="icon" />
            <p className='card-number'>5000 Rs</p>
            <p className='card-title'>Spend Today</p>
        </div>
    )
}

export default Card