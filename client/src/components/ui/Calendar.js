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
            blockedDates: ['2020-03-19T11:00:00.000+00:00', '2020-03-25T11:00:00.000+00:00'],
            errorMessage: 'Por favor cambia la fecha dde inicio ',
        }
    }


    componentDidUpdate = prevProps => prevProps !== this.props && this.setBlockDates()





    checkAvailability = (startDate, endDate) => {

        const prueba = endDate && endDate.isBetween('2020-03-19T11:00:00.000+00:00', '2020-03-21T11:00:00.000+00:00', null, [])

        this.state.blockedDates && this.state.blockedDates.map((elm) => {

            moment(elm).isBetween(startDate, endDate, null, []) ? this.props.setCalendarMessage('Fecha incorrecta, por favor selecciona otra') : this.props.setCalendarMessage('Fecha Correcta')

            // startDate && startDate.isBetween(elm.startDate, elm.endDate, null, []) && console.log('Por favor cambia la fecha dde inicio ')
            // endDate && endDate.isBetween(elm.startDate, elm.endDate, null, []) && console.log('por favor cambia la fecha de finalizacion ')
        })
    }




    setBlockDates = () => {

        let blockedDates = []

        this.props.reservations && this.props.reservations.map(elm => {

            blockedDates = blockedDates.concat(this.getDateArray(elm.startDate, elm.endDate))

        })

        this.setState({ blockedDates: blockedDates })
    }



    getDateArray = (startDate, endDate) => {
        const dateArray = []
        let currentDate = moment(startDate);
        let stopDate = moment(endDate)
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }



    changeHandler = ({ startDate, endDate }) => {
        this.checkAvailability(startDate, endDate)
        this.setState({ startDate, endDate })
        this.props.setReservation({ startDate, endDate })
    }


    //isDayBlocked = () => moment('2020-03-19T11:00:00.000+00:00')


    render() {

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
                    isDayBlocked={day1 => this.state.blockedDates && this.state.blockedDates.map(elm => moment(elm)).some(day2 => isSameDay(day1, day2))}
                />
            </div>
        )
    }
}


export default Calendar




