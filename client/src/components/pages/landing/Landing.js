import React from 'react'

import './Landing.css'

import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


const Landing = () => {

    return (
        <div className='landingHome'>
            <div className='landing'>
                <h5>Book and enjoy, ski and snowboard material and much more in kisharing</h5>
                <hr />
                <p>If you want to rent and enjoy all the materials necessary to practice all mountain sports. Jsut book, rent and enjoy it!</p>
                <Button variant="dark"><Link to='/homepage'>Let`s try</Link></Button>
            </div>
        </div>
    )
}

export default Landing 