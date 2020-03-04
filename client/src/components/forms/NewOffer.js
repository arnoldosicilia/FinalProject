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
                description: '',
                image: '',
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
            .then()
            .catch(err => console.log('error al postear la nueva oferta', err))
    }


    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("image", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => { this.setState({ offer: { ...this.state.offer, image: response.secure_url } }) })
            .catch(err => console.log(err))
    }


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
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="image" onChange={this.handleFileUpload} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control placeholder="Add a brief description if your material" name="description" value={this.state.offer.descfiption} onChange={this.handleChange} />
                </Form.Group>
                <br />
                <Button variant="dark" type="submit">Create</Button>

            </Form>
        )
    }
}

export default NewOfferForm