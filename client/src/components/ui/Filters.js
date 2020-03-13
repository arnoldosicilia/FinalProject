import React, { Component } from 'react'

import Calendar from '../ui/Calendar'

import './Filters.css'
import 'react-calendar/dist/Calendar.css';


import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'







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

    sortByType = e => this.props.sortByType(e.target.name)







    render() {

        let filterTypeTitle = ''
        {
            this.props.type ? filterTypeTitle = `Sort by type: ${this.props.type}` : filterTypeTitle = `Sort by type`
        }


        return (

            <div className='filters' >
                <div className='filter' >
                    <Button variant="outline-primary" title='Sort by Size' onClick={this.props.sortBySize}>Sort by Size {this.props.order && this.props.order}</Button>
                </div>

                <div className='filter' >
                    <DropdownButton variant="outline-primary" title={filterTypeTitle}>
                        <Dropdown.Item name='All' onClick={this.sortByType}>Todos</Dropdown.Item>
                        <Dropdown.Item name='Skis' onClick={this.sortByType}>Skis</Dropdown.Item>
                        <Dropdown.Item name='Snowboard' onClick={this.sortByType}>Sonowboard</Dropdown.Item>

                    </DropdownButton>
                </div>

                <div className='filter' >

                    {this.props.location ? (
                        <DropdownButton variant="outline-primary" id="dropdown-basic-button" title={this.props.location} >
                            {this.props.locations.map((elm, idx) => <Dropdown.Item key={idx} onClick={this.changeLocation} name={elm}>{elm}</Dropdown.Item>)}
                        </DropdownButton>
                    ) : (
                            <DropdownButton variant="outline-primary" id="dropdown-basic-button" title='Select A location '>
                                {this.props.locations.map((elm, idx) => <Dropdown.Item key={idx} onClick={this.changeLocation} name={elm}>{elm}</Dropdown.Item>)}
                            </DropdownButton>)
                    }
                </div>

                <div className='filter' >
                    <DropdownButton variant="outline-primary" title="Select Dates">
                        <Calendar
                            setDates={this.props.setDates}
                        />
                    </DropdownButton>
                </div>

            </div>
        )
    }
}
export default Filters