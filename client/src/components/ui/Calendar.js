import React, { Component } from 'react'
import moment from 'moment';


import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import isSameDay from 'react-dates/lib/utils/isSameDay';
//import DayPickerRangeController from '../src/components/DayPickerRangeController';



class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {


            blockDates: ['2020-03-19T11:00:00.000+00:00', '2020-03-25T11:00:00.000+00:00']
        }
    }

    checkAvailability = (startDate, endDate) => {

        console.log('llama al check availability', endDate)

        const prueba = endDate && endDate.isBetween('2020-03-19T11:00:00.000+00:00', '2020-03-21T11:00:00.000+00:00', null, [])
        console.log(prueba)

        this.props.reservations && this.props.reservations.map((elm) => {
            startDate && startDate.isBetween(elm.startDate, elm.endDate, null, []) && console.log('Por favor cambia la fecha dde inicio ')
            endDate && endDate.isBetween(elm.startDate, elm.endDate, null, []) && console.log('por favor cambia la fecha de finalizacion ')
        })
    }

    getDateArray = (startDate, endDate) => {


        var arr = []
        var i = new Date(startDate);
        while (i <= endDate) {
            arr.push(new Date(i));
            i.setDate(i.getDate() + 1);
        }
        return arr;

        console.log(arr)

    }



    changeHandler = ({ startDate, endDate }) => {

        // console.log(startDate)
        this.checkAvailability(startDate, endDate)


        // this.checkAvailability(startDate)
        this.setState({ startDate, endDate })

        this.props.setReservation({ startDate, endDate })

    }


    isDayBlocked = () => moment('2020-03-19T11:00:00.000+00:00')


    render() {

        // let datesList = this.state.blockDates.map(date => {
        //     return moment(date);
        // });


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
                    isDayBlocked={day1 => this.state.blockDates.map(elm => moment(elm)).some(day2 => isSameDay(day1, day2))}
                />
            </div>
        )
    }
}

export default Calendar




