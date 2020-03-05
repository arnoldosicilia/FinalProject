import React from 'react'

import './OfferCard.css'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

const OfferCard = props => {

    const direction = `/offerDetails/${props._id}`

    return (
        <>
            <div className='offerCard'>
                <figure>
                    <img src={props.image} alt={props.model} />
                </figure>
                <div>
                    <h3>{props.brand}  ||  {props.model}</h3>
                    <p>{props.description}</p>
                    <p>{props.location}</p>
                    <Button variant="primary"><Link to={direction}>check Details</Link></Button>
                </div>

            </div>
            <hr></hr>
        </>


    )
}
export default OfferCard