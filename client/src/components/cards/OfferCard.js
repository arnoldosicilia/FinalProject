import React from 'react'

import './OfferCard.css'

import { Link } from 'react-router-dom'

import Carousel from 'react-bootstrap/Carousel'
const OfferCard = props => {

    const direction = `/offerDetails/${props._id}`

    return (
        <>
            <Link to={direction}>
                <div className='offerCard'>


                    <Carousel>
                        {props.image.map(elm => {
                            return (
                                <Carousel.Item>
                                    <figure>
                                        <img
                                            src={elm}
                                            alt={props.model}
                                        />
                                    </figure>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>


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