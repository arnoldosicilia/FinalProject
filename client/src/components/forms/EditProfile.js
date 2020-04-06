import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import AuthServices from '../../services/auth.services'
import FilesServices from '../../services/file.services'


class EditProfileForm extends Component {
    constructor(props) {
        super(props)
        this.authServices = new AuthServices()
        this.filesServices = new FilesServices()
        this.state = {
            userUpdate: {}

        }
    }

    componentDidMount = () => this.setState({ userUpdate: this.props.loggedInUser })


    handleChange = e => {
        let { name, value, } = e.target
        this.setState({ userUpdate: { ...this.state.userUpdate, [name]: value } })
    }


    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()

        this.props.finishModal()
    }


    updateUser = () => {
        this.authServices.update(this.state.userUpdate)
            .then(user => this.props.fetchUser())
            .catch(err => console.log(err))
    }


    // handleFileUpload = e => {

    //     const uploadData = new FormData()
    //     for (let key in e.target.files) {
    //         uploadData.append("images", e.target.files[key])
    //     }

    //     this.filesServices.handleUpload(uploadData)
    //         .then(response => this.setState({ offer: { ...this.state.offer, images: response.imagesSecureURLs } }))
    //         .catch(err => console.log(err))
    // }


    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control placeholder="Name" type='text' name="name" value={this.state.userUpdate.name} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control placeholder="Surname" type='text' name="surname" value={this.state.userUpdate.surname} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col>

                        <Form.Group>
                            <Form.Label>Size:</Form.Label>
                            <Form.Control placeholder="Phone" type='number' name="phone" value={this.state.userUpdate.phone} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Email" type='email' name="email" value={this.state.userUpdate.email} onChange={this.handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Form.Group>
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
                </Form.Group> */}
                <br />
                <Button variant="dark" type="submit">Update</Button>

            </Form>
        )
    }
}

export default EditProfileForm