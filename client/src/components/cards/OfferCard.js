import React from 'react'

import './OfferCard.css'

import { Link } from 'react-router-dom'

import Carousel from 'react-bootstrap/Carousel'


const OfferCard = props => {

    const cardLink = `/offerDetails/${props._id}`

    return (
        <section>
            <Link to={cardLink}>

                <div className='offerCard'>


                    <Carousel>
                        {props.images.map((elm, idx) => {
                            return (
                                <Carousel.Item key={idx}>
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


                    <div className='properties'>
                        <h3>{props.brand}</h3>
                        <h5>{props.model}</h5>
                        <hr />
                        <p>Description: {props.description}</p>
                        <div className='details'>
                            <p> Location: {props.location}</p>
                            <p>Size: {props.size}</p>
                        </div>

                    </div>
                </div>
            </Link>

        </section>
    )
}
export default OfferCard