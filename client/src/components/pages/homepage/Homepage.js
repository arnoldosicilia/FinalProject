import React, { Component } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import OfferCard from '../../cards/OfferCard'
import Map from '../../maps/HompageMap'
import Filters from '../../ui/Filters'


import OfferServices from '../../../services/offer.services'
import ReservationServices from '../../../services/reservation.services'




class Homepage extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.reservationServices = new ReservationServices()
        this.state = {
            showmodal: true,
            filters: {
                location: '',
                startDate: '',
                finishDate: '',
                sortedBySize: null,
            },
            offersArr: [],
            locations: ['Baqueira', 'Andorra', 'Formigal', 'Sierra Nevada'],


        }
    }



    closeModal = e => {
        this.setLocation(e)
        this.setState({ showmodal: false })
    }


    //Offers Methods
    getOffers = location => {
        this.offerServices.getOffersByLocation(location)
            .then(allOffers => {
                this.setState({ offersArr: allOffers, filters: { location: location } })

            })
            .catch(err => console.log(err))
    }


    // // Filter Methods
    // Location
    setLocation = e => this.getOffers(e.target.value)

    changeLocation = location => {
        console.log('se ha llamado con el siguiente valor', location)
        this.getOffers(location)
    }

    sortBySize = () => {

        const offersArrCopy = [...this.state.offersArr]
        offersArrCopy.sort((a, b) => a.size - b.size)
        const reversedOffersArr = [...offersArrCopy].reverse()

        !this.state.filters.sortedBySize && this.setState({ offersArr: offersArrCopy, filters: { sortedBySize: 'up' } })
        this.state.filters.sortedBySize === 'up' ? this.setState({ offersArr: reversedOffersArr, filters: { sortedBySize: 'down' } }) : this.setState({ offersArr: offersArrCopy, filters: { sortedBySize: 'up' } })

    }










    render() {
        console.log(this.state)
        return (


            <>
                <Modal show={this.state.showmodal} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <h3>What is your ski Location?</h3>
                        <hr></hr>
                        <Row>
                            {this.state.locations.map((elm, idx) => {
                                return (
                                    <Col key={idx}>
                                        <Button variant="outline-primary" onClick={this.closeModal} value={elm}>{elm}</Button>
                                    </Col>)
                            })}
                        </Row>
                    </Modal.Body>
                </Modal>

                <Filters
                    changeLocation={this.changeLocation}
                    locations={this.state.locations}
                    sortBySize={this.sortBySize}
                    order={this.state.sortedBySize}
                    location={this.state.filters.location}

                />


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
                                center={this.state.filters.location}
                            />}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Homepage