import React, { Component } from 'react'

import NewOfferForm from '../forms/NewOffer'

class Profile extends Component {

    constructor() {
        super()
        this.state = {}

    }

    render() {

        return (
            <>
                <h3>Crea una nueva oferta: </h3>
                <NewOfferForm loggedInUser={this.props.loggedInUser}> </NewOfferForm>
            </>
        )

    }
}
export default Profile