import React, { Component } from 'react'

import './OfferDetails.css'

import OfferServices from '../../../services/offer.services'


import Container from 'react-bootstrap/Container'
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

    componentDidMount = () => {
        this.getTheOffer()
        this.checkTheOwner()
    }




    getTheOffer = () => {
        this.offerServices.getOneOffer(this.props.match.params._id)
            .then(Offer => this.setState({ offer: Offer }))
            .catch(err => console.log(err))

    }

    checkTheOwner = () => this.props.loggedInUser._id === this.state.offer.owner && this.props.loggedInUser._id !== undefined ? this.setState({ isTheOwner: true }) : this.setState({ isTheOwner: false })


    render() {

        console.log('------State----', this.state.isTheOwner)

        console.log('------StatOwner----', this.state.offer)

        console.log('-logedinuser--', this.props.loggedInUser)



        return (
            <>

                {this.state.isTheOwner ? <Button>Editar</Button> : null}
                <Row>
                    <Col>
                        <figure className='offerDetails'>
                            <img src={this.state.offer.image} alt={this.state.offer.model} />
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

