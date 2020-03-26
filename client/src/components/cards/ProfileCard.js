import React from 'react'

import moment from 'moment';

import './ProfileCard.css'

const ProfileCard = props => {

    const registrationYear = moment(props.loggedInUser.created_at).format('YYYY')

    return (
        <div className='profileCard'>
            <section>
                <h3>
                    Hola {props.loggedInUser.username}
                </h3>
                <figure>
                    {props.loggedInUser.image ? <img src={props.loggedInUser.image} /> : <img src='https://res.cloudinary.com/dbcrofsyy/image/upload/v1584051760/Backgroundimage_uceciz.jpg' />}
                </figure>
                <small>Se registró en: {registrationYear}</small>
            </section>
            <section>
                <p>Nombre: {props.loggedInUser.name}</p>
                <p>Apellidos: {props.loggedInUser.surname}</p>
                <p>Telefono: {props.loggedInUser.phone}</p>
                <p>Email: {props.loggedInUser.email}</p>
            </section>


        </div>
    )
}

export default ProfileCard
