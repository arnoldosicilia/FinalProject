import React, { Component } from 'react'

import Calendar from 'react-calendar'

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
        this.state = {
            startDate: new Date(),
            finishDate: new Date(),
        }

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






    render() {

        return (

            <div className='filters' >

                <Row>
                    <Col>
                        <Button title='Sort by Size' onClick={this.props.sortBySize}></Button>
                    </Col>
                    <Col>
                        <DropdownButton title="Select a finishDate">
                            <Calendar
                                id="finishDate"
                                onChange={this.finishDate}
                                value={this.state.finishDate}
                            />
                        </DropdownButton>
                    </Col>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Select Location">
                            {this.props.locations.map((elm, idx) => <Dropdown.Item key={idx} onClick={this.changeLocation} name={elm}>{elm}</Dropdown.Item>)}
                        </DropdownButton>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Filters