import React from 'react'
import './card.css';

function Card({ number, title, description, icon }) {
    return (
        <div className='card'>
            <img src={icon} alt="icon" />
            <p className='card-number'>{number}</p>
            {description ? <p className='card-subtitle'>{description}</p> : ""}
            <p className='card-title'>{title}</p>
        </div>
    )
}

export default Card