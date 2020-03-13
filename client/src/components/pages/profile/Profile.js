import React, { Component } from 'react'

import OfferServices from '../../../services/offer.services'
import ReservationServices from '../../../services/reservation.services'

import NewOfferForm from '../../forms/NewOffer'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


import OfferCard from '../../cards/OfferCard'



class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userOffers: [],
            showmodal: false,
            userReservations: [],

        }
        this.offerServices = new OfferServices()
        this.reservationServices = new ReservationServices()

    }

    componentDidMount = () => {
        //this.getUserReservations()
        this.getUserOffers()
    }

    finishModal = () => {
        this.closeModal()
        this.getUserOffers()

        console.log(this.state.userOffers)
    }

    openModal = () => this.setState({ showmodal: true })
    closeModal = () => this.setState({ showmodal: false })


    getUserOffers = () => {
        this.offerServices.getOfferByOwner(this.props.loggedInUser._id)
            .then(allOffers => this.setState({ userOffers: allOffers }))
            .catch(err => console.log(err))
    }

    // getUserReservations = () => {
    //     this.reservationServices.getReservations(this.props.loggedInUser.reservations)
    //         .then(result => this.setState({ userReservations: result }))
    //         .catch(err => console.log(err))


    // }

    render() {
        console.log(this.state.userReservations)
        return (
            <div className='profile'>
                <section>
                    <h2>Hola {this.props.loggedInUser.username}</h2>
                </section>
                <hr />
                <section>
                    <Container>
                        <Row>
                            {this.state.userOffers.map((elm, idx) => <Col key={idx}><OfferCard  {...elm} /></Col>)}
                        </Row>
                    </Container>
                </section>
                <hr />

                <Button variant="dark" onClick={this.openModal}>Create New Offer</Button>

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nueva oferta:</h3>
                        <hr></hr>
                        <NewOfferForm loggedInUser={this.props.loggedInUser} finishModal={this.finishModal} />
                    </Modal.Body>
                </Modal>




            </div>
        )

    }
}
export default Profile