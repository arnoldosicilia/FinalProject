import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import OfferServices from '../../services/offer.services'
import FilesServices from '../../services/file.services'


class NewOfferForm extends Component {
    constructor(props) {
        super(props)
        this.offerServices = new OfferServices()
        this.filesServices = new FilesServices()
        this.state = {
            offer: {
                brand: '',
                model: '',
                size: '',
                type: '',
                direction: '',
                location: '',
                description: '',
                images: [],
                price: '',
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
        this.props.finishModal()
    }


    postOffer = () => {
        this.offerServices.createNewOffer(this.state.offer)
            .then(offer => console.log(offer))
            .catch(err => console.log('error al postear la nueva oferta', err))
    }


    handleFileUpload = e => {

        const uploadData = new FormData()
        for (let key in e.target.files) {
            uploadData.append("images", e.target.files[key])
        }

        this.filesServices.handleUpload(uploadData)
            .then(response => this.setState({ offer: { ...this.state.offer, images: response.imagesSecureURLs } }))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Brand:</Form.Label>
                            <Form.Control placeholder="Brand" type='text' name="brand" value={this.state.offer.brand} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Model:</Form.Label>
                            <Form.Control placeholder="Model" type='text' name="model" value={this.state.offer.model} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Size:</Form.Label>
                            <Form.Control placeholder="Size" type='number' name="size" value={this.state.offer.size} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
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
                    <Form.Label as="legend" column sm={2}>Location</Form.Label>
                    <Row>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Baqueira"
                                name='location'
                                value='Skis'
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Andorra"
                                name='location'
                                value='Andorra'
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Formigal"
                                name='location'
                                value='Formigal'
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Sierra Nevada"
                                name='location'
                                value='Sierra Nevada'
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="images" onChange={this.handleFileUpload} multiple />
                    <br />
                    {this.state.images ? this.state.images.map((elm, idx) => <small key={idx}>{elm}</small>) : <small>Por favor sube una imagen</small>}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control placeholder="Add a brief description if your material" type='text' name="description" value={this.state.offer.descfiption} onChange={this.handleChange} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Direction:</Form.Label>
                    <Form.Control placeholder="Add where they have to pick up the material" type='text' name="direction" value={this.state.offer.direction} onChange={this.handleChange} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control placeholder="Price" type='number' name="price" value={this.state.offer.price} onChange={this.handleChange} />
                </Form.Group>
                <br />
                <Button variant="dark" type="submit">Create</Button>

            </Form>
        )
    }
}

export default NewOfferForm