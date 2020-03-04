import React from 'react'

import './OfferCard.css'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

const OfferCard = props => {

    const direction = `/offerDetails/${props._id}`

    return (
        <Col className='offerCard'>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={props.image} alt={props.model} />
                <Card.Body>
                    <Card.Title>{props.brand}  ||  {props.model}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    <Button variant="primary"><Link to={direction}>check Details</Link></Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default OfferCard