import React, { Component } from 'react'

import OfferServices from '../../../services/offer.services'
import ReservationServices from '../../../services/reservation.services'

import NewOfferForm from '../../forms/NewOffer'
import EditProfileForm from '../../forms/EditProfile'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


import OfferCard from '../../cards/OfferCard'
import ProfileCard from '../../cards/ProfileCard'



class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.loggedInUser,
            userOffers: [],
            userReservations: [],
            profileModal: false,
            offerModal: false,
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

    }


    openOfferModal = () => this.setState({ offerModal: true })
    openProfileModal = () => this.setState({ profileModal: true })

    closeModal = () => this.setState({ offerModal: false, profileModal: false })


    getUserOffers = () => {
        this.offerServices.getOfferByOwner(this.props.loggedInUser._id)
            .then(allOffers => this.setState({ userOffers: allOffers }))
            .catch(err => console.log(err))
    }



    render() {

        return (

            <div className='profile'>
                <section>
                    <ProfileCard loggedInUser={this.props.loggedInUser} />

                    <Button variant="dark" onClick={this.openProfileModal}>Edit Profile</Button>

                    <Modal show={this.state.profileModal} onHide={this.closeModal}>
                        <Modal.Body>
                            <h3>Editar perfil:</h3>
                            <hr></hr>
                            <EditProfileForm loggedInUser={this.props.loggedInUser} fetchUser={this.props.fetchUser} finishModal={this.finishModal} />
                        </Modal.Body>
                    </Modal>
                </section>

                <section>
                    <Container>
                        <Row>
                            {this.state.userOffers.map((elm, idx) => <Col key={idx}> <OfferCard {...elm} /></Col>)}
                        </Row>
                    </Container>

                    <hr />

                    <Button variant="dark" onClick={this.openOfferModal}>Create New Offer</Button>

                    <Modal show={this.state.offerModal} onHide={this.closeModal}>
                        <Modal.Body>
                            <h3>Nueva oferta:</h3>
                            <hr></hr>
                            <NewOfferForm loggedInUser={this.props.loggedInUser} finishModal={this.finishModal} />
                        </Modal.Body>
                    </Modal>
                </section>
            </div>
        )
    }
}

export default Profile