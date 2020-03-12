import React, { Component } from 'react'

import Calendar from '../ui/Calendar'

import './Filters.css'
import 'react-calendar/dist/Calendar.css';


import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'






class Filters extends Component {

    constructor(props) {
        super(props)
        this.state = {}

    }


    //Date Methods
    startDate = value => {
        this.setState({ startDate: value })
        this.props.changeStartDate(value)
    }
    finishDate = value => {
        console.log(value)
        this.setState({ startDate: value })
        this.props.changeFinishDate(value)
    }


    //Location Methods
    changeLocation = e => this.props.changeLocation(e.target.name)



    setDates = ({ startDate, endDate }) => { console.log('estas son las fechas ', startDate, endDate) }



    render() {

        let location = this.props.location

        return (

            <div className='filters' >
                <div className='filter' >

                    <Button title='Sort by Size' onClick={this.props.sortBySize}>Sort by Size {this.props.order && this.props.order}</Button>
                </div>
                <div className='filter' >
                    <DropdownButton title="Select a finishDate">
                        <Calendar
                            setDates={this.setDates}
                        />
                    </DropdownButton>
                </div>
                <div className='filter' >

                    <DropdownButton id="dropdown-basic-button" title={location}>
                        {this.props.locations.map((elm, idx) => <Dropdown.Item key={idx} onClick={this.changeLocation} name={elm}>{elm}</Dropdown.Item>)}
                    </DropdownButton>
                </div>

            </div>
        )
    }
}
export default Filters