import React, { Component } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OfferCard from '../../cards/OfferCard'


import OfferServices from '../../../services/offer.services'


class Homepage extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.state = {
            offersArr: []
        }
    }

    componentDidMount = () => this.getOffers()

    getOffers = () => {
        this.offerServices.getAllOffers()
            .then(allOffers => {
                console.log(allOffers)
                this.setState({ offersArr: allOffers })
            })
            .catch(err => console.log(err))
    }



    render() {

        return (
            <>
                <h2>HOMEPAGE</h2>
                <Row>
                    {this.state.offersArr.map((elm, idx) => <OfferCard key={idx} {...elm} />)}
                </Row>
            </>
        )
    }
}

export default Homepage