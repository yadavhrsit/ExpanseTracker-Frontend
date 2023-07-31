import React from 'react'
import './cardContainer.css';
import Card from './Card';
function CardContainer() {
    return (
        <div className='card-container flip-in-diag-1-tr'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default CardContainer