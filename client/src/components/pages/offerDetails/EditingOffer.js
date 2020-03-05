import React, { Component } from 'react'

import './OfferDetails.css'

import OfferServices from '../../../services/offer.services'


import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

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
    }

    //Brigns the offer from the DB and check if the owner is the same as the logged user
    getTheOffer = () => {
        this.offerServices.getOneOffer(this.props.match.params._id)
            .then(Offer => this.checkTheOwner(Offer))
            .catch(err => console.log(err))
    }

    checkTheOwner = Offer => this.props.loggedInUser._id === Offer.owner ? this.setState({ isTheOwner: true, offer: Offer }) : this.setState({ isTheOwner: false, offer: Offer })



    //Update the offer in the DB
    updateOffer = () => {
        this.offerServices.updateOneOffer(this.state.offer)

    }


    //Form Handlers Management
    handleChange = e => {
        let { name, value, } = e.target
        this.setState({ offer: { ...this.state.offer, [name]: value } })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.updateOffer()
        this.props.history.push(`/offerDetails/${this.state.offer._id}`)
    }


    render() {


        return (
            <>

                {this.state.isTheOwner ? (
                    <>

                        <h1>Formulario de Edición</h1>


                        <Row>
                            <Col>
                                <figure className='offerDetails'>
                                    <img src={this.state.offer.image} alt={this.state.offer.model} />
                                </figure>
                            </Col>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group>
                                        <Form.Label>Brand:</Form.Label>
                                        <Form.Control placeholder="Brand" name="brand" value={this.state.offer.brand} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Model:</Form.Label>
                                        <Form.Control placeholder="Model" name="model" value={this.state.offer.model} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Size:</Form.Label>
                                        <Form.Control placeholder="Size" name="size" value={this.state.offer.size} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control placeholder="Add a brief description if your material" name="description" value={this.state.offer.description} onChange={this.handleChange} />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Label as="legend" column sm={2}>Type</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    type="radio"
                                                    label="Skis"
                                                    name='type'
                                                    value='Skis'
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    type="radio"
                                                    label="Snowboard"
                                                    name="type"
                                                    value='Snowboard'
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control type="file" name="image" onChange={this.handleFileUpload} />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Price:</Form.Label>
                                        <Form.Control placeholder="Price" name="price" value={this.state.offer.price} onChange={this.handleChange} />
                                    </Form.Group>
                                    <br />

                                    <Button variant="dark" type="submit">Update</Button>

                                </Form>

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
                    :
                    (

                        <h1>Hola , No eres el dueño de esta oferta por lo que no puedes editarla</h1>
                    )
                }
            </>
        )
    }


}


export default OfferDetails