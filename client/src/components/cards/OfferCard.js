import React from 'react'

import './OfferCard.css'

import { Link } from 'react-router-dom'

const OfferCard = props => {

    const direction = `/offerDetails/${props._id}`

    return (
        <>
            <Link to={direction}>
                <div className='offerCard'>
                    <figure>
                        <img src={props.image[0]} alt={props.model} />
                    </figure>
                    <div>
                        <h3>{props.brand}  ||  {props.model}</h3>
                        <p>{props.description}</p>
                        <p>{props.location}</p>

                    </div>
                </div>
            </Link>
            <hr></hr>
        </>
    )
}
export default OfferCard