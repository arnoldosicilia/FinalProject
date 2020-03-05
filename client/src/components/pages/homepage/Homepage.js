import React, { Component } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import OfferCard from '../../cards/OfferCard'
import Map from '../../maps/HompageMap'


import OfferServices from '../../../services/offer.services'




class Homepage extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.state = {
            showmodal: true,
            location: '',
            offersArr: [],




        }
    }

    // locations = {
    //     'Baqueira': { latitude: 42.699659, longitude: 0.933011 },
    //     'Formigal': { latitude: 42.775447, longitude: -0.371188 },
    //     'Andorra': { latitude: 42.543899, longitude: 1.733701 },
    //     'Sierra Nevada': { latitude: 37.093798, longitude: -3.399168 }
    // }


    closeModal = e => {
        this.setLocation(e)
        this.setState({ showmodal: false })
        setTimeout(() => this.getOffers(), 10)   //No estaba cogiendo el this.state.location 
    }


    getOffers = () => {
        this.offerServices.getOffersByLocation(this.state.location)
            .then(allOffers => this.setState({ offersArr: allOffers }))
            .catch(err => console.log(err))
    }


    setLocation = e => this.setState({ location: e.target.value })


    render() {


        return (


            <>
                <Modal show={this.state.showmodal} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <h3>What is your ski Location?</h3>
                        <hr></hr>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" onClick={this.closeModal} value='Baqueira'>Baqueira</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" onClick={this.closeModal} value='Andorra'>Andorra</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" onClick={this.closeModal} value='Formigal'>Formigal</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" onClick={this.closeModal} value='Sierra Nevada'>Sierra Nevada</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>


                <Row>
                    <Col>
                        {this.state.offersArr.map((elm, idx) => <OfferCard key={idx} {...elm} />)}
                    </Col>
                    <Col>
                        <Map center={this.state.location} />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Homepage