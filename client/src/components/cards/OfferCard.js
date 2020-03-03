import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const OfferCard = props => {

    console.log(props.image)

    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.image} alt={props.model} />
                <Card.Body>
                    <Card.Title>{props.brand}  ||  {props.model}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default OfferCard