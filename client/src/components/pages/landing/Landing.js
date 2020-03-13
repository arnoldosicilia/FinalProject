import React from 'react'

import './Landing.css'

import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


const Landing = () => {

    return (
        <div className='landingHome'>
            <div className='landing'>
                <h4>Book and enjoy, ski and snowboard material and much more in skisharing</h4>
                <hr />
                <p>If you want to rent and enjoy all the materials necessary to practice all mountain sports. Jsut book, rent and enjoy it!</p>
                <Link to='/homepage'><Button variant="dark" block>Let`s try</Button></Link>
            </div>
        </div>
    )
}

export default Landing 