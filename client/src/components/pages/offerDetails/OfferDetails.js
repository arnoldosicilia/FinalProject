import React, { Component } from 'react'

import './OfferDetails.css'

import OfferServices from '../../../services/offer.services'

import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


class OfferDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offer: {},
            isTheOwner: null
        }
        this.offerServices = new OfferServices()
    }

    componentDidMount = () => this.getTheOffer()


    //Brigns the offer from the DB and check if the owner is the same as the logged user
    getTheOffer = () => {

        this.offerServices.getOneOffer(this.props.match.params._id)
            .then(Offer => this.checkTheOwner(Offer))
            .catch(err => console.log(err))
    }

    checkTheOwner = Offer => this.props.loggedInUser._id === Offer.owner ? this.setState({ isTheOwner: true, offer: Offer }) : this.setState({ isTheOwner: false, offer: Offer })




    render() {

        console.log(this.state.offer.image)

        const edit = `/edit/${this.state.offer._id}`

        return (
            <>

                {this.state.isTheOwner && <Button><Link to={edit}> Editar</Link></Button>}
                <Row>
                    <Col>
                        <figure className='offerDetails'>
                            {this.state.offer.image && <img src={this.state.offer.image[0]} alt={this.state.offer.model} />}
                        </figure>
                    </Col>
                    <Col>
                        <h2>Brand: {this.state.offer.brand}</h2>
                        <h2>Model: {this.state.offer.model}</h2>
                        <h2>Size: {this.state.offer.size}</h2>
                        <p>{this.state.offer.description}</p>
                        <h3>Price :{this.state.offer.price} €/day </h3>

                        <Row>
                            <Col>
                                <br />
                                <Button>Check Availability</Button>
                            </Col>
                            <Col>
                                <h6>Any question?</h6>
                                <Button>Contact with the owner</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default OfferDetails

