import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { Link } from 'react-router-dom'

import AuthServices from '../../services/auth.services'

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.services = new AuthServices()
    }


    logout = () => {
        this.services.logout()
            .then(() => this.props.setTheUser(false))
            .catch(err => console.log(err))
    }


    render() {

        const greeting = this.props.loggedInUser ? <>Hola, {this.props.loggedInUser.username}</> : <>Hola, invitad@</>

        return (

            this.props.loggedInUser ?
                (
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand href="/">SkiSharing!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                                <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
                :
                (
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand href="#home">SkiSharing!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/signup">Registro</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/login">Inicio sesión</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
        )
    }
}

export default NavBar