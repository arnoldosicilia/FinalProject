import React, { Component } from 'react'
// import Calendar from 'react-calendar'

import './OfferDetails.css'

import OfferServices from '../../../services/offer.services'
import ReservationServices from '../../../services/reservation.services'
import Calendar from '../../ui/Calendar'

import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'



class OfferDetails extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.reservationServices = new ReservationServices()
        this.state = {
            offer: {},
            isTheOwner: null,
            reservation: {
                startDate: new Date(),
                finishDate: new Date(),
            },
            buttons: {
                startDateShown: false,
                finishDateShown: false

            }
        }
    }

    componentDidMount = () => this.getTheOffer()


    //Brigns the offer from the DB and check if the owner is the same as the logged user
    getTheOffer = () => {

        this.offerServices.getOneOffer(this.props.match.params._id)
            .then(Offer => this.checkTheOwner(Offer))
            .catch(err => console.log(err))
    }

    checkTheOwner = Offer => this.props.loggedInUser._id === Offer.owner ? this.setState({ isTheOwner: true, offer: Offer }) : this.setState({ isTheOwner: false, offer: Offer })


    //Date Methods
    // startDate = value => {

    //     this.setState({
    //         reservation: {
    //             ...this.state.reservation,
    //             startDate: value
    //         }

    //     })
    // }

    // finishDate = value => {

    //     this.setState({
    //         reservation: {
    //             ...this.state.reservation,
    //             finishDate: value
    //         }

    //     })
    // }


    setReservation = ({ startDate, endDate }) => this.setState({ reservation: { startDate, endDate } })




    createReservation = () => {

        let newReservation = {
            startDate: this.state.reservation.startDate,
            endDate: this.state.reservation.endDate,
            ownerId: this.state.offer.owner,
            offerId: this.state.offer._id
        }



        this.reservationServices.createNewReservation(newReservation)
            .then(response => console.log('se ha creado la reserva', response))
            .catch(err => console.log(err))
    }




    render() {

        // console.log("Al renderizar......", JSON.stringify(this.state.reservation.startDate))

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
                                <Calendar
                                    setReservation={this.setReservation}
                                    reservations={this.state.offer.reservations}
                                />

                                {/* <h3>Start Date</h3>


                                {this.state.reservation.startDate && <h5>{JSON.stringify(this.state.reservation.startDate)}</h5>}
                                <DropdownButton title="Select a startDate">
                                    <Calendar
                                        id="startDate"
                                        onChange={this.startDate}
                                        value={this.state.reservation.startDate}
                                    />
                                </DropdownButton>

                            </Col>


                            <Col>
                                <h3>Finish Date</h3>
                                {this.state.reservation.finishDate && <h5>{JSON.stringify(this.state.reservation.finishDate)}</h5>}
                                <h5>Poner aqui la fecha</h5>
                                <DropdownButton title="Select a finishDate">
                                    <Calendar
                                        id="finishDate"
                                        onChange={this.finishDate}
                                        value={this.state.finishDate}
                                    />
                                </DropdownButton> */}


                            </Col>
                            <Col>
                                <h6>Create Reservation</h6>
                                <Button onClick={this.createReservation}>Create</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }
}

export default OfferDetails

