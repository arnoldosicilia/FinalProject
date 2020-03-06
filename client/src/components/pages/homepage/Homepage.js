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
    }


    getOffers = location => {
        this.offerServices.getOffersByLocation(location)
            .then(allOffers => {
                this.setState({ offersArr: allOffers, location: location })
            })
            .catch(err => console.log(err))
    }


    setLocation = e => {
        this.getOffers(e.target.value)
    }



    render() {

        console.log(this.state.offersArr)
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
                        {this.state.offersArr.length > 0 && this.state.offersArr.map((elm, idx) => <OfferCard key={idx} {...elm} />)}
                    </Col>
                    <Col>
                        {this.state.offersArr.length > 0 &&
                            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                                loadingElement={<div style={{ height: "100%" }} />}
                                containerElement={<div style={{ height: "100%" }} />}
                                mapElement={<div style={{ height: "100%" }} />}
                                offers={this.state.offersArr}
                                center={this.state.location}
                            />}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Homepage