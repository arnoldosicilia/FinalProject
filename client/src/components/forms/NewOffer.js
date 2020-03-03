import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import OfferServices from '../../services/offer.services'


class NewOfferForm extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.state = {
            offer: {
                brand: '',
                model: '',
                size: '',
                type: '',
                description: '',
                images: []
            }


        }

    }

    handleChange = e => {

        let { name, value, } = e.target
        this.setState({ offer: { ...this.state.offer, [name]: value } })
    }


    handleSubmit = e => {

        e.preventDefault()
        this.postOffer()
    }


    postOffer = () => {
        this.offerServices.createNewOffer(this.state.offer)
            .then(newOffer => console.log(newOffer))
            .catch(err => console.log('error al postear la nueva oferta', err))
    }


    // handleFileUpload = e => {
    //     const uploadData = new FormData()
    //     uploadData.append("imageUrl", e.target.files[0])
    //     this.filesServices.handleUpload(uploadData)
    //         .then(response => {
    //             console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
    //             this.setState({
    //                 coaster: { ...this.state.coaster, imageUrl: response.secure_url }
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }


    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Brand:</Form.Label>
                            <Form.Control placeholder="Brand" name="brand" value={this.state.offer.brand} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Model:</Form.Label>
                            <Form.Control placeholder="Model" name="model" value={this.state.offer.model} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Size:</Form.Label>
                            <Form.Control placeholder="Size" name="size" value={this.state.offer.size} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

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
                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    {/* <Form.Control type="text" name="imageUrl" value={this.state.coaster.imageUrl} onChange={this.handleChange} /> */}
                </Form.Group>

                <Button variant="dark" type="submit">Create</Button>

            </Form>
        )
    }
}

export default NewOfferForm