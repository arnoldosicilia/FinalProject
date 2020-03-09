import React, { Component } from 'react'


import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    checkAvailability = dateSelected => {




        this.props.reservations && this.props.reservations.map((elm) => {
            // let comparation = dates.inRange(this.state.startDate, elm.startDate, elm.endDate)
            console.log(elm.startDate)

            console.log(dateSelected)


            let date = new Date(dateSelected).getTime()
            let start = new Date(elm.startDate).getTime()
            let endDate = new Date(elm.endDate).getTime()

            //console.log(date, start, endDate)
        })
    }

    compareDates = (date, start, end) => {


    }




    changeHandler = ({ startDate, endDate }) => {

        this.checkAvailability(startDate)
        console.log(startDate)

        // this.checkAvailability(startDate)
        this.setState({ startDate, endDate })

        this.props.setReservation({ startDate, endDate })


    }


    render() {

        this.checkAvailability()

        return (
            <div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.changeHandler({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        )
    }
}

export default Calendar